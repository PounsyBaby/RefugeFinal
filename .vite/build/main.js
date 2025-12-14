"use strict";
const electron = require("electron");
const path = require("path");
const require$$0 = require(".prisma/client/default");
var _default;
var hasRequired_default;
function require_default() {
  if (hasRequired_default) return _default;
  hasRequired_default = 1;
  _default = {
    ...require$$0
  };
  return _default;
}
var _defaultExports = /* @__PURE__ */ require_default();
const prisma$2 = new _defaultExports.PrismaClient();
const serialize$1 = (data) => {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  }));
};
const animalRepository = {
  getAnimals: async () => {
    const animals = await prisma$2.animal.findMany({
      include: {
        espece: true
      },
      orderBy: {
        date_arrivee: "desc"
      }
    });
    return serialize$1(animals);
  },
  createAnimal: async (data) => {
    if (data.microchip_no === "") {
      data.microchip_no = null;
    }
    if (data.poids_kg === "") {
      data.poids_kg = null;
    }
    const animal = await prisma$2.animal.create({
      data
    });
    return serialize$1(animal);
  },
  getAnimal: async (id) => {
    const animal = await prisma$2.animal.findUnique({
      where: { id_animal: id },
      include: { espece: true }
    });
    return serialize$1(animal);
  },
  updateAnimal: async (id, data) => {
    if (data.microchip_no === "") {
      data.microchip_no = null;
    }
    if (data.poids_kg === "") {
      data.poids_kg = null;
    }
    const animal = await prisma$2.animal.update({
      where: { id_animal: id },
      data
    });
    return serialize$1(animal);
  },
  deleteAnimal: async (id) => {
    const animal = await prisma$2.animal.delete({
      where: { id_animal: id }
    });
    return serialize$1(animal);
  }
  // Add other methods here
};
const registerAnimalRepository = () => {
  electron.ipcMain.handle("animalRepository:getAnimals", async () => {
    return await animalRepository.getAnimals();
  });
  electron.ipcMain.handle("animalRepository:createAnimal", async (event, data) => {
    return await animalRepository.createAnimal(data);
  });
  electron.ipcMain.handle("animalRepository:getAnimal", async (event, id) => {
    return await animalRepository.getAnimal(id);
  });
  electron.ipcMain.handle("animalRepository:updateAnimal", async (event, id, data) => {
    return await animalRepository.updateAnimal(id, data);
  });
  electron.ipcMain.handle("animalRepository:deleteAnimal", async (event, id) => {
    return await animalRepository.deleteAnimal(id);
  });
};
const prisma$1 = new _defaultExports.PrismaClient();
const userRepository = {
  login: async (email, passwordHash) => {
    const user = await prisma$1.utilisateur.findUnique({
      where: { email }
    });
    if (user && user.motdepasse_hash === passwordHash && user.actif) {
      const { motdepasse_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
};
const registerUserRepository = () => {
  electron.ipcMain.handle("authRepository:login", async (event, email, password) => {
    return await userRepository.login(email, password);
  });
};
const prisma = new _defaultExports.PrismaClient();
const serialize = (data) => {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  }));
};
const especeRepository = {
  getAll: async () => {
    const especes = await prisma.espece.findMany();
    return serialize(especes);
  }
};
const registerEspeceRepository = () => {
  electron.ipcMain.handle("especeRepository:getAll", async () => {
    return await especeRepository.getAll();
  });
};
const registerRepositories = () => {
  registerAnimalRepository();
  registerUserRepository();
  registerEspeceRepository();
};
if (require("electron-squirrel-startup")) {
  electron.app.quit();
}
const createWindow = () => {
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  {
    mainWindow.loadURL("http://localhost:5173");
  }
};
electron.app.on("ready", () => {
  createWindow();
  registerRepositories();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
