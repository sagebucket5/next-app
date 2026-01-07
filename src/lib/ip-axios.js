import axios from "axios";

export default async function ipAxiosHandler() {
    try {
        // Step 1: Get the client's IP address
        const ipResponse = await axios.get("https://api-bdc.net/data/client-ip");
        const ipAddress = ipResponse.data;

        // Step 2: Use the IP to fetch geolocation info
        const locationResponse = await axios.get(
            `http://ip-api.com/json/${ipAddress?.ipString}`
        );
        const ipData = locationResponse.data;

        console.log("📍 IP Location Data:", ipData);
        return ipData;
    } catch (error) {
        console.error("❌ Error fetching IP data:", error);
        return {
            cityName: "Not Captured",
            regionName: "Not Captured",
            countryCode: "XX",
        };
    }
}