import { ipcRenderer } from 'electron';
import { Animal } from '../shared/types';

export const animalService = {
  getAnimals: (): Promise<Animal[]> => {
    return ipcRenderer.invoke('animalRepository:getAnimals');
  },
  createAnimal: (data: Omit<Animal, 'id_animal'>): Promise<Animal> => {
    return ipcRenderer.invoke('animalRepository:createAnimal', data);
  },
  getAnimal: (id: number): Promise<Animal> => {
    return ipcRenderer.invoke('animalRepository:getAnimal', id);
  },
  updateAnimal: (id: number, data: Partial<Animal>): Promise<Animal> => {
    return ipcRenderer.invoke('animalRepository:updateAnimal', id, data);
  },
  deleteAnimal: (id: number): Promise<void> => {
    return ipcRenderer.invoke('animalRepository:deleteAnimal', id);
  },
};
