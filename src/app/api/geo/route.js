import { NextResponse } from "next/server";

function getClientIp(req) {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  return null;
}

export async function GET(req) {
  try {
    const ip = getClientIp(req);

    if (!ip) {
      return NextResponse.json(
        { ok: false, error: "Client IP not found" },
        { status: 400 }
      );
    }

    // Use a server-side geo provider.
    // ip-api is OK server-side, but DON'T call it from the browser.
    const res = await fetch(`http://ip-api.com/json/${ip}`, {
      cache: "no-store",
      headers: { "User-Agent": "geo-lookup/1.0" }, // helps sometimes
    });

    const geo = await res.json();

    return NextResponse.json({ ok: true, ip, geo });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Geo lookup failed" },
      { status: 500 }
    );
  }
}