import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const requestIp = require("request-ip");
    const clientIp = requestIp.getClientIp(req);
    let resBody = { ip: clientIp };

    context.res = {
      // status: 200, /* Defaults to 200 */
      headers: { "Content-Type": "application/json" },
      body: resBody,
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message,
    };
  }
};

export default httpTrigger;
