import { registerAnimalRepository } from './repositories/registerAnimalRepository';
import { registerUserRepository } from './repositories/registerUserRepository';
import { registerEspeceRepository } from './repositories/registerEspeceRepository';

export const registerRepositories = () => {
  registerAnimalRepository();
  registerUserRepository();
  registerEspeceRepository();
};
