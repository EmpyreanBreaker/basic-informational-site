import http from "node:http";
import fs from "node:fs/promises";

const ROUTES = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};
// Create a local server to receive data from
const server = http.createServer(async (request, response) => {
  const fileName = ROUTES[request.url] || "404.html";

  const fileUrl = new URL(`./${fileName}`, import.meta.url);

  try {
    const data = await fs.readFile(fileUrl, "utf-8");

    response.setHeader("Content-Type", "text/html");

    if (!ROUTES[request.url]) {
      response.statusCode = 404;
    }

    response.end(data);

  } catch (error) {
    response.statusCode = 500;

    response.end("Server Error");
  }
});

server.listen(8000);
