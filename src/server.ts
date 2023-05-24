import "dotenv/config";
import express from "express";
import { router } from "./http/routes";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`App is running on ${PORT} port`)
);
process.on("SIGINT", () => {
  server.close();
  console.log("Server was killed");
});
