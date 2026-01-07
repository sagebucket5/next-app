import { NextResponse } from "next/server";

function pickClientIp(req) {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  return null;
}

export async function GET(req) {
  const ip = pickClientIp(req);

  return NextResponse.json({
    ip,
    headers: {
      cf: req.headers.get("cf-connecting-ip"),
      xff: req.headers.get("x-forwarded-for"),
      real: req.headers.get("x-real-ip"),
    },
  });
}