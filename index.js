import express from "express";
import bootstrap from "./src/app.controller.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const startServer = async () => {
  try {
    const port = 3000;
    await bootstrap(express, app);
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();