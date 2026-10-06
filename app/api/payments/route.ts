import { NextResponse } from "next/server";
import { initializePayment } from "@/lib/payments";
export async function POST() {
  return NextResponse.json(await initializePayment());
}
