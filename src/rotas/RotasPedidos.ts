import express, { Request, Response } from "express";
import { calculoCasoDeUso } from "../casosDeUso/calculoCasoDeUso";

const routes = express.Router();

routes.post("/pedido", async (req: Request, res: Response) => {
  try {
    const { nome, cep, sacasCafe, vencimentoPagamento } = req.body;

    const pedido = await calculoCasoDeUso.execute({
      nome,
      cep,
      sacasCafe,
      vencimentoPagamento,
    });
    return res.status(201).json(pedido);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

routes.get("/", async (req: Request, res: Response) => {
  try {
    return res.status(201).json({ ok: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

export default routes;
