import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ApiError } from "../erros";
import { IProdutorRepositorio } from "../interfaces/IProdutorRepositorio";
import { Produtor } from "../entidades/Produtor";

const prisma = new PrismaClient();

export class MsSqlProdutorRepositorio implements IProdutorRepositorio {
  constructor() {}

  async listar(): Promise<Produtor[]> {
    try {
      throw new ApiError(400, "Method not implemented yet");
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async salvar(dados: Produtor): Promise<void> {
    try {
      throw new ApiError(400, "Method not implemented yet");
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }
}
