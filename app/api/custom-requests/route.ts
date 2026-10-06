import { NextResponse } from "next/server";
import { mkdir, writeFile, rename, rm } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
export const runtime = "nodejs";
// Local development adapter. Replace with private durable storage before deployment.
export async function POST(request: Request) {
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.CUSTOM_REQUEST_STORAGE_DIR
  )
    return NextResponse.json(
      {
        error:
          "Custom requests are not connected on this deployment yet. Please contact support.",
      },
      { status: 503 },
    );
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host"))
    return NextResponse.json(
      { error: "Please submit your request from this website." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 50 * 1024 * 1024)
    return NextResponse.json(
      { error: "Please keep your total upload under 48 MB." },
      { status: 413 },
    );
  let staging = "";
  try {
    const form = await request.formData();
    const raw = form.get("details");
    if (typeof raw !== "string" || raw.length > 20000)
      throw Error("Please check your request details.");
    const details = JSON.parse(raw) as Record<string, string>;
    for (const field of [
      "occasion",
      "servings",
      "size",
      "tiers",
      "flavour",
      "filling",
      "frosting",
      "eventDate",
      "deliveryDate",
      "budget",
      "fullName",
      "email",
      "phone",
    ])
      if (typeof details[field] !== "string" || !details[field].trim())
        throw Error(
          "Please complete your cake details, dates and contact information.",
        );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
      throw Error("Please enter an email address we can reply to.");
    if (!/^\+?[\d\s()-]{10,18}$/.test(details.phone))
      throw Error("Please enter a phone number we can use to reach you.");
    if (
      details.method === "Delivery" &&
      (!details.address?.trim() || !details.area?.trim())
    )
      throw Error("Please include your delivery address and area.");
    const files = form
      .getAll("photos")
      .filter((v): v is File => v instanceof File);
    if (files.length > 6) throw Error("Please choose no more than six photos.");
    const id = "EXTQ-C-" + randomUUID();
    const root =
      process.env.CUSTOM_REQUEST_STORAGE_DIR ||
      path.join(process.cwd(), ".data", "custom-requests");
    staging = path.join(root, ".pending-" + id);
    await mkdir(staging, { recursive: true, mode: 0o700 });
    const images = [];
    for (const [i, file] of files.entries()) {
      if (
        file.size > 8 * 1024 * 1024 ||
        !["image/jpeg", "image/png", "image/webp"].includes(file.type)
      )
        throw Error("Use JPG, PNG or WebP photos under 8 MB each.");
      const buffer = Buffer.from(await file.arrayBuffer());
      const valid =
        (file.type === "image/jpeg" &&
          buffer[0] === 255 &&
          buffer[1] === 216) ||
        (file.type === "image/png" &&
          buffer
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) ||
        (file.type === "image/webp" &&
          buffer.toString("ascii", 0, 4) === "RIFF" &&
          buffer.toString("ascii", 8, 12) === "WEBP");
      if (!valid)
        throw Error(
          "One of your photos could not be read. Please choose another image.",
        );
      const filename = `inspiration-${i + 1}.${file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1]}`;
      await writeFile(path.join(staging, filename), buffer, { mode: 0o600 });
      images.push({ filename, originalName: file.name.slice(0, 200) });
    }
    await writeFile(
      path.join(staging, "request.json"),
      JSON.stringify(
        {
          id,
          details,
          images,
          status: "received",
          createdAt: new Date().toISOString(),
        },
        null,
        2,
      ),
      { mode: 0o600 },
    );
    await rename(staging, path.join(root, id));
    staging = "";
    return NextResponse.json(
      {
        id,
        status: "received",
        mode: process.env.NODE_ENV === "production" ? "live" : "local",
      },
      { status: 201 },
    );
  } catch (error) {
    if (staging) await rm(staging, { recursive: true, force: true });
    return NextResponse.json(
      {
        error:
          error instanceof SyntaxError
            ? "Please check your request and try again."
            : error instanceof Error && error.message && !("code" in error)
              ? error.message
              : "We couldn’t save your request. Please try again.",
      },
      { status: 400 },
    );
  }
}
