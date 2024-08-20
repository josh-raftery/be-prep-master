// const { testApiHandler } = require("next-test-api-route-handler");
// const pagesHandler = require("../src/app/recipes/page");
// Import the handler under test and its config from the pages/api directory
// import * as pagesHandler from "../pages/api/your-endpoint";

it.skip("does what I want", async () => {
  // NTARH supports optionally typed response data via TypeScript generics:
  (await testApiHandler) <
    { hello: string } >
    {
      pagesHandler,
      requestPatcher: (req) => {
        req.headers = { key: process.env.SPECIAL_TOKEN };
      },
      test: async ({ fetch }) => {
        const res = await fetch({ method: "POST", body: "data" });
        // The next line would cause TypeScript to complain:
        // const { goodbye: hello } = await res.json();
        const { hello } = await res.json();
        expect(hello).toBe("world"); // ◄ Passes!
      },
    };
});
