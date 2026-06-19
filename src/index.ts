import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || "8000";

const startServer = () => {
  try {
    app.listen(port, () => console.log("Server running in port:", port));
  } catch (error) {
    console.error("Start server failed", error);
    process.exit(1);
  }
};

startServer();
