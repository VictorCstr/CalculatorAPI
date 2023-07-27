import { CalculoCasoDeUso } from "./calculoCasoDeUso";

// Repositories
// const userRepository = new PostgresUserRepository();

// Providers
// const calculoProvisor = ne

//Inicializa o useCase
const calculoCasoDeUso = new CalculoCasoDeUso(userRepository);

export { calculoCasoDeUso };
