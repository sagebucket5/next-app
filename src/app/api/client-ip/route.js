import { NextResponse } from "next/server";

function getClientIp(req) {
  // Cloudflare (if used)
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  // Vercel / proxies (works even without Cloudflare)
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  // Fallback
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  return null;
}

export async function GET(req) {
  const ip = getClientIp(req);

  return NextResponse.json({
    ip,
    debug: {
      cf: req.headers.get("cf-connecting-ip"),
      xff: req.headers.get("x-forwarded-for"),
      real: req.headers.get("x-real-ip"),
    },
  });
}