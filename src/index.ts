import express, { json, Request, Response } from "express";
import BaseRouter from "./routes";
import cors from "cors";
import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";
import { AppDataSource } from "./data-source";
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

AppDataSource.initialize()
  .then(() => {
    app.listen(7000);
    console.log("life pet server initalized");
  })
  .catch((error) => console.log(error));
