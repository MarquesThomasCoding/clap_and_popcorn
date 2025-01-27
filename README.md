# Clap and Popcorn

Clap and Popcorn est une application web construite avec Next.js, React et Tailwind CSS. Ce projet utilise Firebase pour la gestion des données et inclut plusieurs dépendances pour améliorer le développement et les fonctionnalités de l'application. Il consiste en une plateforme de recherche de films et de séries, avec des fonctionnalités telles que la recherche, la visualisation des détails, la sauvegarde des favoris et la gestion des utilisateurs.

## Technologies 

![Techs](https://skillicons.dev/icons?i=next,react,tailwindcss,firebase)

## Installation

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/MarquesThomasCoding/clap-and-popcorn.git
    cd clap-and-popcorn
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Configurez les variables d'environnement :
    - Créez un fichier [.env.local](http://_vscodecontentref_/0) à la racine du projet.
    - Ajoutez les variables nécessaires pour la configuration Firebase et autres services.

## Scripts

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Compile l'application pour la production.

## Structure du Projet

- [.next](http://_vscodecontentref_/1) : Dossier généré par Next.js contenant les fichiers de build.
- [public](http://_vscodecontentref_/2) : Dossier pour les fichiers statiques (images, etc.).
- [src](http://_vscodecontentref_/3) : Dossier principal pour le code source de l'application.
  - `app/` : Contient les pages et composants principaux de l'application.
  - `components/` : Contient les composants réutilisables.
  - `firebaseConfig.ts` : Configuration Firebase.
  - `hooks/` : Contient les hooks personnalisés.
  - `lib/` : Contient les bibliothèques et utilitaires.
  - `types/` : Contient les types TypeScript.

## Dépendances Principales

- `next` : Framework React pour les applications web.
- `react` : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- `firebase` : Plateforme pour le développement d'applications web et mobiles.
- `tailwindcss` : Framework CSS utilitaire pour un design rapide et réactif.

## Aperçu

https://clap-and-popcorn.vercel.app/