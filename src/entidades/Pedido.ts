import { randomUUID } from "crypto";

export class Pedido {
  readonly id: string;
  nome: string;
  cep: number;
  sacasCafe: number;
  vencimentoPagamento: Date;

  constructor(props: Omit<Pedido, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
