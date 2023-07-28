import { randomUUID } from "crypto";
import { Estado } from "./enum/Estado";

export class Produtor {
  readonly id: string;
  nome: string;
  estado: Estado;
  sacasCafe: number;
  valorLiberado: number;
  vencimentoPagamento: Date;

  constructor(props: Omit<Produtor, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
