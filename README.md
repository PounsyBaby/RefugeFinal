# 🐾 Refuge Animalier - Application de Gestion

Une application de bureau moderne construite avec **Electron**, **Vue.js 3**, et **Prisma** pour gérer les opérations quotidiennes d'un refuge animalier.

![Status](https://img.shields.io/badge/Status-Functional-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Fonctionnalités

- **Authentification Sécurisée** : Système de connexion pour le personnel (Admin/Staff).
- **Gestion des Animaux (CRUD)** :
  - Ajouter, modifier, supprimer et lister les animaux.
  - Gestion des détails : Puce (Microchip), Tatouage, Espèce, Race, Date de naissance, etc.
  - Gestion intelligente des contraintes d'unicité (ex: puce vide gérée comme `null`).
- **Interface Moderne** :
  - Design responsive et épuré.
  - **Mode Sombre (Dark Mode)** natif basé sur le thème Catppuccin.
- **Base de Données Robuste** : Utilisation de MySQL avec Prisma ORM pour une intégrité des données stricte.

## 🛠️ Stack Technique

- **Runtime** : [Electron](https://www.electronjs.org/) (v28+)
- **Frontend** : [Vue.js 3](https://vuejs.org/) (Composition API) + [Vite](https://vitejs.dev/)
- **Backend / ORM** : [Prisma](https://www.prisma.io/)
- **Base de Données** : MySQL
- **Langage** : TypeScript / JavaScript

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1.  **Node.js** (v18 ou supérieur) : [Télécharger ici](https://nodejs.org/)
2.  **MySQL Server** : [Télécharger ici](https://dev.mysql.com/downloads/installer/)
3.  **Git** : [Télécharger ici](https://git-scm.com/)

## 🚀 Installation et Configuration

Suivez ces étapes pour lancer le projet sur votre machine locale.

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/refuge-animalier.git
cd refuge-animalier
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de la Base de Données

1.  Ouvrez votre gestionnaire MySQL (MySQL Workbench, HeidiSQL, ou ligne de commande) et créez une nouvelle base de données vide nommée `refuge` (ou le nom de votre choix).

    ```sql
    CREATE DATABASE refuge;
    ```

2.  À la racine du projet, dupliquez le fichier `.env.exemple` et renommez-le en `.env`.

3.  Modifiez le fichier `.env` avec vos identifiants MySQL :

    ```env
    # Exemple pour un utilisateur 'root' sans mot de passe sur le port 3306
    DATABASE_URL="mysql://root:@localhost:3306/refuge"

    # Exemple avec mot de passe 'password'
    # DATABASE_URL="mysql://root:password@localhost:3306/refuge"
    ```

### 4. Synchroniser la Base de Données (Prisma)

Cette commande va créer toutes les tables nécessaires dans votre base de données MySQL en se basant sur le schéma du projet.

```bash
npx prisma db push
```

### 5. Initialiser les Données (Seed)

Pour pouvoir vous connecter, vous devez créer un premier utilisateur administrateur. Un script est fourni pour cela.

```bash
node seed.js
```

> **Note** : Ce script crée un utilisateur par défaut :
> - **Email** : `admin@refuge.com`
> - **Mot de passe** : `admin123`

## ▶️ Lancer l'Application

Une fois l'installation terminée, lancez l'application en mode développement :

```bash
npm start
```

L'application devrait s'ouvrir dans une nouvelle fenêtre. Connectez-vous avec les identifiants créés à l'étape précédente.

## 📦 Structure du Projet

```
refuge-animalier/
├── src/
│   ├── main/                 # Processus Principal (Electron)
│   │   ├── main.ts           # Point d'entrée
│   │   ├── ipcHandlers.ts    # Gestion des événements IPC
│   │   └── repositories/     # Logique métier & Accès BDD (Prisma)
│   ├── preload/              # Scripts de préchargement (Bridge de sécurité)
│   ├── renderer/             # Frontend (Vue.js)
│   │   ├── components/       # Composants réutilisables
│   │   ├── views/            # Pages (Login, Home, AnimalForm)
│   │   ├── router/           # Configuration des routes
│   │   └── App.vue           # Racine de l'interface
│   └── repositories/         # Définitions Prisma (schema.prisma)
├── seed.js                   # Script d'initialisation BDD
├── package.json              # Dépendances et scripts
└── .env                      # Configuration sensible (non versionné)
```

## ❓ Dépannage (Troubleshooting)

### Erreur : "Authentication failed against database server"
- **Cause** : Les identifiants dans le fichier `.env` sont incorrects.
- **Solution** : Vérifiez votre nom d'utilisateur et mot de passe MySQL. Assurez-vous que le serveur MySQL est bien lancé.

### Erreur : "Unique constraint failed on the fields: (`microchip_no`)"
- **Cause** : Vous essayez d'ajouter un animal avec un numéro de puce qui existe déjà.
- **Solution** : Le numéro de puce doit être unique. Si l'animal n'a pas de puce, laissez le champ vide (le système le convertira automatiquement en `null` pour éviter ce conflit).

### Erreur : "Object could not be cloned" (IPC Error)
- **Cause** : Prisma retourne parfois des objets complexes (BigInt, Decimal) qui ne peuvent pas être envoyés tels quels au Frontend via Electron.
- **Solution** : Le projet utilise une fonction utilitaire `serialize` dans les repositories pour nettoyer les données avant l'envoi. Si vous ajoutez de nouvelles fonctionnalités, assurez-vous d'utiliser cette méthode.

### Erreur : "Prisma Client could not be initialized"
- **Cause** : Le client Prisma n'a pas été généré ou est corrompu.
- **Solution** : Lancez `npx prisma generate`.

## 🔨 Commandes Utiles

- `npm start` : Lance l'application en mode dev.
- `npx prisma db push` : Met à jour la structure de la BDD.
- `npx prisma studio` : Ouvre une interface web pour explorer votre BDD.
- `npm run make` : Compile l'application en exécutable (.exe).

---
