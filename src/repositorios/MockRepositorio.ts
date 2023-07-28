import { Produtor } from "../entidades/Produtor";
import { ApiError } from "../erros";
import { IProdutorRepositorio } from "../interfaces/IProdutorRepositorio";

export class MockRepositorio implements IProdutorRepositorio {
  private produtores: Produtor[] = [
    {
      id: "f512a749-a761-4007-8d23-87beb869be2f",
      nome: "Victor Teste ",
      estado: "MG",
      sacasCafe: 22,
      valorLiberado: 41717.83,
      vencimentoPagamento: new Date(),
      dataSimulacao: new Date(),
    },
    {
      id: "f512a749-a761-4007-8d23-87beb869be2f",
      nome: "Victor Teste 2",
      estado: "MG",
      sacasCafe: 30,
      valorLiberado: 40000.83,
      vencimentoPagamento: new Date(),
      dataSimulacao: new Date(),
    },
    {
      id: "f512a749-a761-4007-8d23-87beb869be2f",
      nome: "Victor Teste 3",
      estado: "SP",
      sacasCafe: 2,
      valorLiberado: 30000.83,
      vencimentoPagamento: new Date(),
      dataSimulacao: new Date(),
    },
  ];

  async listar(): Promise<Produtor[]> {
    return await this.produtores;
  }
  async salvar(dados: Produtor): Promise<void> {
    await this.produtores.push(dados);
  }
}
