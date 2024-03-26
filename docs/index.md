# 🏠 Lodestone
===============================================

Lodestone is a self-hosted, open source server hosting tool for Minecraft and other multiplayer games. The project consists of two components: a dashboard written in React + TypeScript and a backend written in Rust. The project provides a hosted web application, a backend (Lodestone Core) and a desktop client.

🔗 The project repository on GitHub can be viewed [here](https://github.com/Lodestone-Team/lodestone).

## Project Overview

The Lodestone project has three components.

- **Lodestone Core** is the backend service the end-users deploy on their machine. 
    - Communicates with the frontend dashboard and handles user management, authentication, game server management and file management. 
    - Is available for download via the project’s GitHub Release page, or via the Lodestone CLI.
    - Does not have the ability to auto-update, that functionality is instead delegated to the Lodestone CLI.    
- **Dashboard** is the UI the end-users interact with to perform actions on the connected core.
    - A user can access the dashboard as a web application hosted at lodestone.cc, or they can choose to host it themselves either by cloning the repository or by using the provided Docker image.
- **Lodestone Desktop** bundles the dashboard and core into an installable desktop app. 
    - The desktop client has an updater built-in, which prompts the user whether they want to update when there is a new release.

## CLI

Additionally, the project also provides a command line tool to aid the end-users in their deployment of Lodestone Core.

## Branching

The repository contains 2 major branches: `main` and `dev`. The `main` branch contains code in the latest stable release, and the `dev` branch contains code in the latest beta release. After a beta version is deemed stable enough, it is merged into the main branch.