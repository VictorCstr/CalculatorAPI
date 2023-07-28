import express, { Request, Response } from "express";
import { calculoCasoDeUso } from "../casosDeUso/calculoCasoDeUso";
import { listarCasoDeUso } from "../casosDeUso/listarCasoDeUso";
import verificarInputs from "../middlewares/validacaoDeInputs";
import logger from "../utils/logger";

const routes = express.Router();

routes.post("/pedido", verificarInputs, async (req: Request, res: Response) => {
  try {
    const { nome, cep, sacasCafe, vencimentoPagamento } = req.body;

    const pedido = await calculoCasoDeUso.execute({
      nome,
      cep,
      sacasCafe,
      vencimentoPagamento,
    });

    logger.info("Requisição recebida na rota POST /pedido");
    logger.info("Requisição:");
    logger.info(req.body);
    logger.info("Respostas:");
    logger.info(pedido);

    return res.status(201).json(pedido);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

routes.get("/pedidos", async (req: Request, res: Response) => {
  try {
    const pedidos = await listarCasoDeUso.execute();

    logger.info("Requisição recebida na rota GET /pedidos");
    logger.info("Resposta:");
    logger.info(pedidos);

    return res.status(201).json(pedidos);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

export default routes;
