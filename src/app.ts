import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./rotas/RotasPedidos";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

export default app;
