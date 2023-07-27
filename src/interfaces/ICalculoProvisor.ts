import { Estado } from "../entidades/enum/Estado";

export interface ICalculoProvisor {
  calcular(estado: Estado, sacas: number, dataPagamento: Date): Promise<void>;
}
