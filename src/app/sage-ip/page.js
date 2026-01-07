import ipHandler from "@/lib/Ip";
import ipAxiosHandler from "@/lib/ip-axios";

export default async function sageIp() {
    const ipData = await ipHandler();
    const axiosIpData = await ipAxiosHandler();

    return (<>
        <h2>This code is used in Sagenext Fetch await</h2>
        <pre>{JSON.stringify(ipData, null, 2)}</pre>

        <h2>Used Axios get</h2>
        <pre>{JSON.stringify(axiosIpData, null, 2)}</pre>

    </>);
}