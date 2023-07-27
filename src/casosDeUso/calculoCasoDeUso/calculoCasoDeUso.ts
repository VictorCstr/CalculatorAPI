import { ICalculoDTO } from "./calculoDTO";
import { ApiError } from "../../erros/index";
import { IProdutorRepositorio } from "../../interfaces/IProdutorRepositorio";
import { Produtor } from "../../entidades/Produtor";
import { ICalculoProvisor } from "../../interfaces/ICalculoProvisor";
import { IEstadoProvisor } from "../../interfaces/IEstadoProvisor";

export class CalculoCasoDeUso {
  constructor(
    private calculoRepositorio: IProdutorRepositorio,
    private calculoProvisor: ICalculoProvisor,
    private estadoProvisor: IEstadoProvisor
  ) {}

  async execute(data: ICalculoDTO): Promise<Produtor> {
    const { nome, cep, sacasCafe, vencimentoPagamento } = data;

    if (!nome || !cep || !sacasCafe || !vencimentoPagamento) {
      throw new ApiError(400, "Dados não informados pelo cliente");
    }

    const estado = this.estadoProvisor.checarEstado(cep);

    const valorDeDireito = await this.calculoRepositorio.calcular(user);

    const calculoPedido = new Produtor({
      nome,
      estado,
      sacasCafe,
      valorEmprestimo: valorDeDireito,
      vencimentoPagamento,
    });

    await this.calculoRepositorio.salvar(calculoPedido);

    return calculoPedido;
  }
}
