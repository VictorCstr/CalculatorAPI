import { randomUUID } from "crypto";

export class Produtor {
  readonly id: string;
  nome: string;
  estado: string;
  sacasCafe: number;
  valorLiberado: number;
  vencimentoPagamento: Date;
  dataSimulacao: Date;

  constructor(props: Omit<Produtor, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
