import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const axios = require("axios").default;
    const xml2js = require("xml2js");

    axios
      .get("http://whois.arin.net/rest/ip/" + req.params.ip)
      .then(function (response) {
        // handle success
        // TODO convert xml body to json
        let resBody = xml2js
          .parseString(response, (err, result) => {
            if (err) {
              throw err;
            }
            // `result` is a JavaScript object; convert it to a JSON string
            const json = JSON.stringify(result, null, 4);
            console.log(json);
            return json;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });

        /* Insert logic here */

        context.res = {
          // status: 200, /* Defaults to 200 */
          headers: { "Content-Type": "application/json" },
          body: resBody,
        };
      });
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message,
    };
  }
};

export default httpTrigger;
