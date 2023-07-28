import { PrismaClient } from "@prisma/client";
import { ApiError } from "../erros";
import { IProdutorRepositorio } from "../interfaces/IProdutorRepositorio";
import { Produtor } from "../entidades/Produtor";

const prisma = new PrismaClient();

export class MsSqlProdutorRepositorio implements IProdutorRepositorio {
  constructor() {}

  async listar(): Promise<Produtor[]> {
    try {
      return await prisma.produtor.findMany({
        orderBy: {
          dataSimulacao: "desc",
        },
        take: 10,
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async salvar(dados: Produtor): Promise<void> {
    try {
      await prisma.produtor.create({ data: dados });
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }
}
