import { ApiError } from "../../erros/index";
import { IProdutorRepositorio } from "../../interfaces/IProdutorRepositorio";
import { Produtor } from "../../entidades/Produtor";

export class ListarCasoDeUso {
  constructor(private calculoRepositorio: IProdutorRepositorio) {}

  async execute(): Promise<Produtor[]> {
    return await this.calculoRepositorio.listar();
  }
}
