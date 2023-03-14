// Criando um repositório bara o usuário

import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);