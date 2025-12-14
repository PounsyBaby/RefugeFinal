"use strict";
const electron = require("electron");
const animalService = {
  getAnimals: () => {
    return electron.ipcRenderer.invoke("animalRepository:getAnimals");
  },
  createAnimal: (data) => {
    return electron.ipcRenderer.invoke("animalRepository:createAnimal", data);
  },
  getAnimal: (id) => {
    return electron.ipcRenderer.invoke("animalRepository:getAnimal", id);
  },
  updateAnimal: (id, data) => {
    return electron.ipcRenderer.invoke("animalRepository:updateAnimal", id, data);
  },
  deleteAnimal: (id) => {
    return electron.ipcRenderer.invoke("animalRepository:deleteAnimal", id);
  }
};
const authService = {
  login: (email, password) => {
    return electron.ipcRenderer.invoke("authRepository:login", email, password);
  }
};
const especeService = {
  getAll: () => {
    return electron.ipcRenderer.invoke("especeRepository:getAll");
  }
};
electron.contextBridge.exposeInMainWorld("electronService", {
  animals: animalService,
  auth: authService,
  especes: especeService
});
