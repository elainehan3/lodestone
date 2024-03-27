# 🚀 Getting Started for Developers 
---

#### Setup Guide  

After cloning this repo, make sure you are on the `dev` branch.

**Setting up git hooks**

`npm install -g ci-skipper`   

`cd hooks `   

`./copy-hooks`    

- **important**: do **NOT** run `ci-skipper on`, even though the ci-skipper package may tell you to, as it will mess with our git hooks

**Setting up frontend:**

`cd dashboard`

`npm i`

`npm run dev`

**Setting up backend:**

`cd core`

`cargo run`

Open the running frontend, connect to a core and then continue.

![setup lodestone](https://i.imgur.com/LZpvmyC.jpg)

From your `cargo` terminal, copy and paste the `Setup key` generated and paste it in the app where it says `Setup key`.

![setup lodestone](https://i.imgur.com/tt9jeos.jpg)

#### Codebase walkthrough

The Lodestone codebase is divided into 2 parts: the frontend, and the Core.

The frontend is written in React and handles user interaction. Actions completed by the users are sent as HTTP Requests to the backend, and the response is then displayed back to the user.

The `Core` is Lodestone's backend, written in Rust, where most of the server hosting takes place.

A brief breakdown of the code is given below. Previous knowledge of Rust and Rest APIs is necessary.

```
`core`
│   `main.rs` => entry point to the backend, invokes `run` from `lib.rs`
│   `lib.rs`    
│   │   `run` => completes the setup for the app, including initiating `AppState` and API `Routes` to expose
│   │   `restore_instances` => restore instances in `C:/Users/%USER%/.lodestone` to restore the instance to memory
│   └─  `AppState` => global variable that is used and managed by a web server framework Axum
│
└───`implementations` => the code that defines an instance
│   └───`generics` => `PENDING...`
│   └───`minecraft` => normal Minecraft instances
│       └─  `mod.rs` => defines the `MinecraftInstance` struct and all the methods it implements
└───`traits` => defines the traits the instances implements
│   └───`mod.rs`
│        │  `InfoInstance` => completes the setup for the app, including initiating `AppState` and API `Routes` to expose
│        └─ `TInstance` => generic trait that is a composition of multiple traits, implemented by the instances 
└───`handlers` => defines the route handlers for Axum and communication with the frontend
└───`auth` => code for users and authentication
```

#### Next Steps

* Read the more about the codebase
in [Project Overview](../Project Overview)

* Read about the 4 steps of our release pipeline in the **Release Pipeline** tab
    * [Build](../Build Process)
    * [Integration](../Integration Process)
    * [Release](../Release Process)
    * [Monitoring](../Monitoring Process)