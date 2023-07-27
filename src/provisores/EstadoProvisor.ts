import axios from "axios";
import { Estado } from "../entidades/enum/Estado";
import { IEstadoProvisor } from "../interfaces/IEstadoProvisor";
import { ApiError } from "../erros";

export class EstadoProvisor implements IEstadoProvisor {
  async checarEstado(cep: number): Promise<Estado> {
    try {
      let estado = await axios({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        method: "get",
      });

      const uf = estado.data.uf;

      const estadosPermitidos = Object.keys(Estado);

      return !estadosPermitidos.includes(uf) ? null : uf;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, "Unexpected Error");
    }
  }
}
