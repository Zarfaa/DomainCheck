import Axios from "axios";

export const checkDomainAvailability = async (req, res) => {
  try {
    const inputJson = req.query.q;
    if (!inputJson) {
      return res.status(400).send("Missing 'q' parameter");
    }

    const { url, fn, params } = JSON.parse(inputJson);
    
    if (fn !== "namecheap.domains.check") {
      return res.status(400).send("Unsupported function");
    }

    const response = await Axios.get(url, {
      params: { ...params, ApiUser: process.env.NAMECHEAP_USER, ApiKey: process.env.NAMECHEAP_API_KEY, Command: "namecheap.domains.check", ClientIp: process.env.CLIENT_IP },
    });

    const result = response.data;

    const htmlResponse = `<html><head><meta my_output='${JSON.stringify(result)}'></head></html>`;

    res.send(htmlResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
