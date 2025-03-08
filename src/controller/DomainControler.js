import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


export const checkDomainAvailability = async (req, res) => {
  try {

    const inputJson = req.query.q;
    if (!inputJson) {
      return res.status(400).send("Missing 'q' parameter");
    }

    const { fn, params } = JSON.parse(inputJson);

    if (fn !== "namecheap.domains.check") {
      return res.status(400).send("Unsupported function");
    }

    const apiUrl = `https://api.sandbox.namecheap.com/xml.response`;

    const queryParams = {
      ApiUser: process.env.NAMECHEAP_USER,
      ApiKey: process.env.NAMECHEAP_API_KEY,
      UserName: process.env.NAMECHEAP_USER, 
      ClientIp: process.env.CLIENT_IP,
      Command: "namecheap.domains.check",
      ...params,
    };


    const response = await axios.get(apiUrl, { params: queryParams });


    const resultXml = response.data;

    const htmlResponse = `<html><head><meta my_output='${JSON.stringify(
      resultXml
    )}'></head></html>`;

    res.send(htmlResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
