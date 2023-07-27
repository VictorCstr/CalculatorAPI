import { Produtor } from "../entidades/Produtor";

export interface IProdutorRepositorio {
  salvar(dados: Produtor): Promise<void>;
  listar(): Promise<Produtor[]>;
}
