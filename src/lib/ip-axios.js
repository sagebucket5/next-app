import axios from "axios";

export default async function ipAxiosHandler() {
  try {
    const { data } = await axios.get("/api/client-ip");
    const ip = data?.ip;

    if (!ip) throw new Error("Client IP not found");

    // Use HTTPS (your http version is bad in browser)
    const { data: ipData } = await axios.get(`https://ip-api.com/json/${ip}`);

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