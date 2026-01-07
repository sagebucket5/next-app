export default async function ipHandler() {
    try {
        // Step 1: Get the client's IP address
        const ipResponse = await fetch("https://api-bdc.net/data/client-ip");
        const ipAddress = await ipResponse.json();

        // Step 2: Use the IP to fetch geolocation info
        const locationResponse = await fetch(`http://ip-api.com/json/${ipAddress?.ipString}`);
        const ipData = await locationResponse.json();

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