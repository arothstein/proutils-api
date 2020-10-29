import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const axios = require("axios").default;

    const res = await axios.get("http://whois.arin.net/rest/ip/" + req.params.ip, { headers: {
    'Accept': 'application/json'
  }});
    console.log(res.data);

    context.res = {
          // status: 200, /* Defaults to 200 */
          headers: { "Content-Type": "application/json" },
          body: res.data,
        };

  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    };
  }
};

export default httpTrigger;
