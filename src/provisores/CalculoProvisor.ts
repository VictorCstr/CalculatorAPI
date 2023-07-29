import axios from "axios";
import { Estado } from "../entidades/enum/Estado";
import { IEstadoProvisor } from "../interfaces/IEstadoProvisor";
import { ApiError } from "../erros";
import { ICalculoProvisor } from "../interfaces/ICalculoProvisor";
import logger from "../utils/logger";

export class CalculoProvisor implements ICalculoProvisor {
  private jurosAoDia = (1 + 0.02) ** (1 / 30) - 1;

  private valorDeSacaPorEstado = { SP: 1050, MG: 1100, BA: 1080, ES: 1030 };

  constructor() {}

  async calcular(
    estado: Estado,
    sacas: number,
    dataPagamento: Date,
    dataAtual: Date
  ): Promise<number> {
    try {
      let valorDaSaca = Object.entries(this.valorDeSacaPorEstado).find(
        (est) => {
          return estado === est[0];
        }
      );

      let valorTotalSemJuros = valorDaSaca[1] * sacas;

      let msDeDiferenca = Number(dataPagamento) - Number(dataAtual);

      const diasDeDiferenca =
        Math.floor(msDeDiferenca / (1000 * 60 * 60 * 24)) - 1;

      const valorTotal =
        valorTotalSemJuros * (1 + this.jurosAoDia) ** diasDeDiferenca;

      return Number(valorTotal.toFixed(2));
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }
}
