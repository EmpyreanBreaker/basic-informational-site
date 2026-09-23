const express = require("express");
const fs = require("node:fs/promises");

const app = express();

const ROUTES = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

app.get(["/", "/about", "/contact-me"], async (request, response) => {
  try {
    const fileName = ROUTES[request.path];
    const data = await fs.readFile(`./${fileName}`, "utf-8");

    response.type("html").send(data);
  } catch (error) {
    response.status(500).send("Server Error");
  }
});

app.use(async (request, response) => {
  try {
    const data = await fs.readFile("./404.html", "utf-8");
    response.status(404).type("html").send(data);
  } catch (error) {
    response.status(500).send("Server Error");
  }
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
