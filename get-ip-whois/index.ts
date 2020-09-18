import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    /* Insert logic here */

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "",
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message,
    };
  }
};

export default httpTrigger;
