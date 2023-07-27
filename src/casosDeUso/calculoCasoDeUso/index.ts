import { CalculoProvisor } from "../../provisores/CalculoProvisor";
import { EstadoProvisor } from "../../provisores/EstadoProvisor";
import { MsSqlProdutorRepositorio } from "../../repositorios/MsSqlProdutorRepositorio";
import { CalculoCasoDeUso } from "./calculoCasoDeUso";

// Repositories
const msSqlRepositorio = new MsSqlProdutorRepositorio();

// Providers
const calculoProvisor = new CalculoProvisor();
const estadoProvisor = new EstadoProvisor();

//Inicializa o useCase
const calculoCasoDeUso = new CalculoCasoDeUso(
  msSqlRepositorio,
  calculoProvisor,
  estadoProvisor
);

export { calculoCasoDeUso };
