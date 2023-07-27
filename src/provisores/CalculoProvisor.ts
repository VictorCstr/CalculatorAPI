import axios from "axios";
import { Estado } from "../entidades/enum/Estado";
import { IEstadoProvisor } from "../interfaces/IEstadoProvisor";
import { ApiError } from "../erros";
import { ICalculoProvisor } from "../interfaces/ICalculoProvisor";

export class CalculoProvisor implements ICalculoProvisor {
  async calcular(
    estado: Estado,
    sacas: number,
    dataPagamento: Date
  ): Promise<number> {
    try {
      throw new ApiError(400, "Method not implemented yet");
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }
}
