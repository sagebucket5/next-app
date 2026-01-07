"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/geo", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    })();
  }, []);

  return (
    <pre className="p-4 text-sm">
      {data ? JSON.stringify(data, null, 2) : "Loading..."}
    </pre>
  );
}
