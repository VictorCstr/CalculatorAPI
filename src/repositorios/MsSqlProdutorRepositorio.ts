import { PrismaClient } from "@prisma/client";
import { ApiError } from "../erros";
import { IProdutorRepositorio } from "../interfaces/IProdutorRepositorio";
import { Produtor } from "../entidades/Produtor";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class MsSqlProdutorRepositorio implements IProdutorRepositorio {
  constructor() {}

  async listar(): Promise<Produtor[]> {
    try {
      let pedidos = await prisma.produtor.findMany({
        orderBy: {
          dataSimulacao: "desc",
        },
        take: 10,
      });

      pedidos.sort(function (a, b) {
        return Number(b.vencimentoPagamento) - Number(a.vencimentoPagamento);
      });

      return await pedidos;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }

  async salvar(dados: Produtor): Promise<void> {
    try {
      await prisma.produtor.create({ data: dados });
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }
}
