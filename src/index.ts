import express from "express";

import config from "./config";

import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/logger";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many request",
});

app.use(helmet());

app.use(limiter);

const allowedOrigins = ["https://www.test.com", "https://www.google.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  })
);

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});
