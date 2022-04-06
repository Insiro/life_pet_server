import express, { json, Request, Response } from "express";
import BaseRouter from "./routes";
import cors from "cors";
import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";
import { dataSourceOption } from "./config";
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
    msg: "Hello, World!",
  });
});

//set Router
app.use("/api", BaseRouter);
app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ error: "Not Found" });
});

const datasource = new DataSource(dataSourceOption);
datasource
  .initialize()
  .then(() => {
    app.listen(7000);
  })
  .catch((error) => console.log(error));
