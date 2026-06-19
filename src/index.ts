import "dotenv/config";
import express from "express";
import taskRoute from "./routes/task.route";

const app = express();
const port = process.env.PORT || "8000";

app.use("/api/tasks", taskRoute);

const startServer = () => {
  try {
    app.listen(port, () => console.log("Server running in port:", port));
  } catch (error) {
    console.error("Start server failed", error);
    process.exit(1);
  }
};

startServer();
