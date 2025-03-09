import Axios from "axios";
import Dotenv from "dotenv";
Dotenv.config();

// **Helper function to send API responses as meta tags**
const sendResponse = (res, status, data = null, error = null) => {
  res.status(status === "success" ? 200 : 400).send(
    `<meta name="viewport" content="width=device-width, initial-scale=1">
        ${data ? `<meta name="data" content='${JSON.stringify(data)}'>` : ""}
        ${error ? `<meta name="error" content='${error}'>` : ""}`
  );
};

// **Namecheap API Logic**
const checkNamecheapDomain = async (params) => {
  const apiUrl = "https://api.sandbox.namecheap.com/xml.response";

  const queryParams = {
    ApiUser: process.env.NAMECHEAP_USER,
    ApiKey: process.env.NAMECHEAP_API_KEY,
    UserName: process.env.NAMECHEAP_USER,
    ClientIp: process.env.CLIENT_IP,
    Command: "namecheap.domains.check",
    ...params,
  };

  try {
    const response = await Axios.get(apiUrl, { params: queryParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message; 
  }
};

// **GoDaddy API Logic**
const checkGoDaddyDomain = async (domainName) => {
  if (!domainName) throw new Error("Missing 'domainName' parameter");

  const apiUrl = `https://api.ote-godaddy.com/v1/domains/available?domain=${domainName}`;
  const headers = {
    Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
    Accept: "application/json",
  };

  try {
    const response = await Axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message; 
  }
};

// **Main handler function**
export const checkDomainAvailability = async (req, res) => {
  try {
    const inputJson = req.query.q;
    if (!inputJson) return sendResponse(res, "error", "Missing 'q' parameter");

    const { fn, params } = JSON.parse(inputJson);
    let result;

    switch (fn) {
      case "namecheap.domains.check":
        result = await checkNamecheapDomain(params);
        break;

      case "godaddy.domains.check":
        result = await checkGoDaddyDomain(params.domainName);
        break;

      default:
        return sendResponse(res, "error", "Unsupported function");
    }

    sendResponse(res, "success", result);
  } catch (error) {
    console.error("Error:", error);
    sendResponse(res, "error", "An unexpected error occurred", null, error);
  }
};
