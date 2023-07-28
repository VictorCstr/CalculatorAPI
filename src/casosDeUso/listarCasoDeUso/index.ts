import { CalculoProvisor } from "../../provisores/CalculoProvisor";
import { EstadoProvisor } from "../../provisores/EstadoProvisor";
import { MsSqlProdutorRepositorio } from "../../repositorios/MsSqlProdutorRepositorio";
import { ListarCasoDeUso } from "./listarCasoDeUso";

// Repositories
const msSqlRepositorio = new MsSqlProdutorRepositorio();

// Providers
// const calculoProvisor = new CalculoProvisor();
// const estadoProvisor = new EstadoProvisor();

//Inicializa o useCase
const listarCasoDeUso = new ListarCasoDeUso(msSqlRepositorio);

export { listarCasoDeUso };
