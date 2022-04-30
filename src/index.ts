import express, { json, Request, Response } from "express";
import BaseRouter from "./routes";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { httpErrorHandler } from "./middleware";
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  maxAge: 3600,
};

export const app = express();
app.use(cors(corsOptions));
app.use(json());
app.get("/", (req: Request, res: Response) => {
  res.send({
    msg: "Life Pet API",
  });
});

//set Router
app.use("/api", BaseRouter);

// Error hnadling MiddleWare
app.use(httpErrorHandler);

app.get("*", (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

AppDataSource.initialize()
  .then(() => {
    app.listen(7000);
    console.log("life pet server initalized");
  })
  .catch((error) => console.log(error));
