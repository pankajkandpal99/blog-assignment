import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { contextMiddleware } from "./middleware/context";
import baseRouter from "./api/v1/routes";
import { databaseConnection } from "./lib/db";
import { errorHandler } from "./error-handler/error-handler";
import { corsOptions, staticCorsOptions } from "./config/corsOptions";
import path from "path";

export const createApp = async () => {
  const app = express();
  const db = databaseConnection.getConnection();

  // Middlewares
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(helmet());
  app.use(contextMiddleware(db));

  const uploadsPath = path.join(__dirname, "../uploads");
  app.use(
    "/uploads",
    cors(staticCorsOptions),
    express.static(uploadsPath, {
      setHeaders: (res, path) => {
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Cache-Control", "public, max-age=31536000");
      },
    })
  );

  // Routes
  app.use("/api/v1", baseRouter);

  app.use(errorHandler as unknown as express.ErrorRequestHandler);
  return app;
};
