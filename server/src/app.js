import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./routes/user.route";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-control",
      "Exprires",
      "pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users", userRoutes);

export { app };
