import { randomUUID } from "crypto";

export class Produtor {
  constructor(props: Omit<Produtor, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}
