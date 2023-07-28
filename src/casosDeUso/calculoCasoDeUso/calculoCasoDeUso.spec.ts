import jest from "jest";
import { CalculoCasoDeUso } from "./calculoCasoDeUso";
import { MockRepositorio } from "../../repositorios/MockRepositorio";
import { CalculoProvisor } from "../../provisores/CalculoProvisor";
import { EstadoProvisor } from "../../provisores/EstadoProvisor";
import { Produtor } from "../../entidades/Produtor";
import { ApiError } from "../../erros";

describe("Calcular Valor de Empréstimo, POST /user", () => {
  let fakeRepositorio, casoDeUso, calculoProvisor, estadoProvisor;

  fakeRepositorio = new MockRepositorio();
  calculoProvisor = new CalculoProvisor();
  estadoProvisor = new EstadoProvisor();

  beforeAll(() => {
    casoDeUso = new CalculoCasoDeUso(
      fakeRepositorio,
      calculoProvisor,
      estadoProvisor
    );
  });

  it("Deveria retornar o calculo e criar no banco de dados retornando o pedido", async () => {
    const pedido = {
      nome: "Victor Teste de Teste",
      cep: 37026550,
      sacasCafe: 2,
      vencimentoPagamento: new Date("2023-10-20"),
    };

    const criarPedido: Produtor = await casoDeUso.execute(pedido);

    expect(criarPedido).toBeDefined();
    expect(criarPedido.valorLiberado).not.toBeUndefined();
  });

  it("Deveria retornar um erro se faltar alguma informação do usuário", async () => {
    const pedido = {
      nome: "Victor Teste de Teste",
      cep: 37026550,
      vencimentoPagamento: new Date("2023-10-20"),
    };

    await casoDeUso.execute(pedido).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.msg).toMatch(/Dados não informados pelo cliente/);
    });
  });

  it("Deveria retornar um erro se o CEP informado não condizer com os Estados com preços de sacas definidos", async () => {
    const pedido = {
      nome: "Victor Teste de Teste",
      cep: 69900000,
      sacasCafe: 2,
      vencimentoPagamento: new Date("2023-10-20"),
    };

    await casoDeUso.execute(pedido).catch((err) => {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toEqual(404);
      expect(err.msg).toMatch(/Não é aceito pedidos para o estado informado/);
    });
  });

  it("Deveria pegar a data atual para cálculo de forma automática", async () => {
    const pedido = {
      nome: "Victor Teste de Teste",
      cep: 12235190,
      sacasCafe: 2,
      vencimentoPagamento: new Date("2023-10-20"),
    };

    const criarPedido = await casoDeUso.execute(pedido);

    expect(criarPedido).toBeDefined();
    expect(criarPedido.dataSimulacao).not.toBeUndefined();
  });

  it("Deveria calcular o valor liberado para o produtor", async () => {
    const pedido = {
      estado: "SP",
      sacas: 2,
      dataPagamento: new Date("2023-10-20"),
      dataAtual: new Date("2023-07-28"),
    };

    const calcular = await calculoProvisor.calcular(
      pedido.estado,
      pedido.sacas,
      pedido.dataPagamento,
      pedido.dataAtual
    );

    expect(calcular).toBeDefined();
    expect(calcular).toBeGreaterThanOrEqual(0);
  });
});
