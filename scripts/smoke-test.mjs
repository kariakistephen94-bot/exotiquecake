import assert from "node:assert/strict";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
for (const route of [
  "/",
  "/shop",
  "/shop/lavender-bloom",
  "/cart",
  "/checkout",
  "/custom-cakes",
  "/orders",
  "/account",
  "/manifest.webmanifest",
  "/robots.txt",
]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
}
const payment = await (
  await fetch(base + "/api/payments", { method: "POST" })
).json();
assert.equal(payment.mode, "demo");
assert.equal(payment.status, "unpaid");
const invalid = new FormData();
invalid.append("details", JSON.stringify({ email: "bad" }));
assert.equal(
  (
    await fetch(base + "/api/custom-requests", {
      method: "POST",
      body: invalid,
    })
  ).status,
  400,
);
const details = {
  occasion: "Birthday",
  servings: "20",
  size: "8 inch",
  tiers: "1",
  flavour: "Vanilla",
  filling: "Vanilla Cream",
  frosting: "Buttercream",
  eventDate: "2026-12-20",
  deliveryDate: "2026-12-20",
  budget: "₦35,000 – ₦50,000",
  fullName: "Automated Preview Test",
  email: "preview@example.com",
  phone: "08000000000",
  method: "Pickup",
};
const form = new FormData();
form.append("details", JSON.stringify(details));
form.append(
  "photos",
  new Blob([await readFile("public/images/1.jpg")], { type: "image/jpeg" }),
  "inspiration.jpg",
);
const response = await fetch(base + "/api/custom-requests", {
  method: "POST",
  body: form,
});
const result = await response.json();
assert.equal(response.status, 201, JSON.stringify(result));
assert.equal(result.status, "received");
const folder = path.join(".data", "custom-requests", result.id);
try {
  const saved = JSON.parse(
    await readFile(path.join(folder, "request.json"), "utf8"),
  );
  assert.equal(saved.details.email, details.email);
  assert.equal(saved.images.length, 1);
  assert.ok(
    (await readFile(path.join(folder, saved.images[0].filename))).length > 0,
  );
} finally {
  await rm(folder, { recursive: true, force: true });
}
console.log(
  "PASS: 10 routes, unpaid payment adapter, custom-request validation, private request and photo persistence. Test request removed.",
);
