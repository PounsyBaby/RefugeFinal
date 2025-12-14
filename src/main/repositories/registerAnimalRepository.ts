import { ipcMain } from 'electron';
import { animalRepository } from './animalRepository';

export const registerAnimalRepository = () => {
  ipcMain.handle('animalRepository:getAnimals', async () => {
    return await animalRepository.getAnimals();
  });

  ipcMain.handle('animalRepository:createAnimal', async (event, data) => {
    return await animalRepository.createAnimal(data);
  });

  ipcMain.handle('animalRepository:getAnimal', async (event, id) => {
    return await animalRepository.getAnimal(id);
  });

  ipcMain.handle('animalRepository:updateAnimal', async (event, id, data) => {
    return await animalRepository.updateAnimal(id, data);
  });

  ipcMain.handle('animalRepository:deleteAnimal', async (event, id) => {
    return await animalRepository.deleteAnimal(id);
  });
};
