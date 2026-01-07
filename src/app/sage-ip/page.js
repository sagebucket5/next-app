"use client";

import { useEffect, useState } from "react";
import ipAxiosHandler from "@/lib/ip-axios";


export default async function sageIp() {
    const [data, setData] = useState(null);

    useEffect(() => {
        ipAxiosHandler().then(setData);
    }, []);

    return (<>
        <h2>Used Axios get</h2>
        <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>

    </>);
}