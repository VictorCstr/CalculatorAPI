import { Estado } from "../entidades/enum/Estado";

export interface IEstadoProvisor {
  checarEstado(cep: number): Promise<Estado>;
}
