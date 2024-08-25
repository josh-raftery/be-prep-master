import { getAllBaskets } from "controller/basketController";
import { NextResponse } from "next/server";

export async function GET() {
    return getAllBaskets ().then((baskets) => {
      return NextResponse.json(baskets, { status: 200 });
    });
  }