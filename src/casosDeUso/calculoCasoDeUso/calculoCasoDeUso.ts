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

    const estado = await this.estadoProvisor.checarEstado(cep);

    if (estado == null) {
      throw new ApiError(404, "Não é aceito pedidos para o estado informado");
    }

    let dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);

    let vencimento = new Date(vencimentoPagamento);

    const valorLiberado = await this.calculoProvisor.calcular(
      estado,
      sacasCafe,
      vencimento,
      dataAtual
    );

    const calculoPedido = new Produtor({
      nome,
      estado,
      sacasCafe,
      valorLiberado,
      vencimentoPagamento: vencimento,
      dataSimulacao: dataAtual,
    });

    await this.calculoRepositorio.salvar(calculoPedido);

    return calculoPedido;
  }
}
