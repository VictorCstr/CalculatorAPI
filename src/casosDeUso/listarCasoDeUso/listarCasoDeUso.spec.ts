import supertest from "supertest";
import app from "../../app";
import { ListarCasoDeUso } from "./listarCasoDeUso";
import { MockRepositorio } from "../../repositorios/MockRepositorio";
import { CalculoProvisor } from "../../provisores/CalculoProvisor";
import { EstadoProvisor } from "../../provisores/EstadoProvisor";
import { Produtor } from "../../entidades/Produtor";
import { CalculoCasoDeUso } from "../calculoCasoDeUso/calculoCasoDeUso";

describe("Listar ultimas simulações, GET /pedidos", () => {
  let fakeRepositorio,
    casoDeUso,
    calculoCasoDeUso,
    calculoProvisor,
    estadoProvisor;

  fakeRepositorio = new MockRepositorio();
  calculoProvisor = new CalculoProvisor();
  estadoProvisor = new EstadoProvisor();

  beforeAll(() => {
    casoDeUso = new ListarCasoDeUso(fakeRepositorio);
    calculoCasoDeUso = new CalculoCasoDeUso(
      fakeRepositorio,
      calculoProvisor,
      estadoProvisor
    );
  });

  it("Deveria retornar uma lista das ultimas 10 simulacoes ordenadas pelo maior vencimento", async () => {
    const pedidos: Produtor[] = await casoDeUso.execute();

    expect(pedidos).toBeDefined();
    expect(pedidos).toHaveLength(10);
    expect(pedidos[0].vencimentoPagamento.valueOf()).toBeGreaterThan(
      pedidos[9].vencimentoPagamento.valueOf()
    );
  });

  it("Deveria retornar no topo da lista a nova simulação feita", async () => {
    const pedido = {
      nome: "Primeiro",
      cep: 37026550,
      sacasCafe: 2,
      vencimentoPagamento: new Date("2024-10-20"),
    };

    await calculoCasoDeUso.execute(pedido);

    const pedidos: Produtor[] = await casoDeUso.execute();

    expect(pedidos).toBeDefined();

    expect(pedidos[0].nome).toEqual(pedido.nome);
    expect(pedidos[0].sacasCafe).toEqual(pedido.sacasCafe);
    expect(pedidos[0].vencimentoPagamento).toEqual(pedido.vencimentoPagamento);
  });
});

describe("Calcular Simulação de Empréstimo, POST /pedido, Integração", () => {
  let fakeRepositorio,
    casoDeUso,
    calculoCasoDeUso,
    calculoProvisor,
    estadoProvisor,
    server;

  fakeRepositorio = new MockRepositorio();
  calculoProvisor = new CalculoProvisor();
  estadoProvisor = new EstadoProvisor();

  beforeAll(() => {
    server = supertest(app);
    casoDeUso = new ListarCasoDeUso(fakeRepositorio);
    calculoCasoDeUso = new CalculoCasoDeUso(
      fakeRepositorio,
      calculoProvisor,
      estadoProvisor
    );
  });
  it("Deveria retornar código 200 e a lista de pedidos do banco", async () => {
    return server.get("/pedidos").then((res) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeLessThanOrEqual(10);
    });
  });
});
