# 🛠️ Build Process
===============================================

######Table of Contents:######
* [Building Lodestone Core with Cargo](#building-lodestone-core-with-cargo)
* [Building Dashboard with npm](#building-dashboard-with-npm)
* [Building Lodestone Desktop with Cargo](#building-lodestone-desktop-with-cargo)

===============================================

The Lodestone project aims to make it convenient for the average user with no IT experience to self-host game servers. Therefore, it is important for Lodestone to provide precompiled binaries for as many major platforms as possible. Currently, Lodestone aims to build the precompiled binary for the above three components (Dashboard, Core, Desktop) available for the following platforms and architectures:

**Lodestone Core:**  
- x86 Windows11   
- x86 MacOS   
- x86 Linux   
- aarch Linux   

**Dashboard:**    
- Web   

**Lodestone Desktop:**    
- x86 Windows11   
- x86 MacOS   

#### Building Lodestone Core with Cargo

The codebase of Lodestone Core is a Cargo project. Cargo is Rust’s build system and a package manager that also provides functionalities such as testing; it is similar to Maven in the Java space. Cargo, being a framework-driven build tool, does the majority of heavy lifting in building Lodestone Core. Unlike lower level tools, such as make or cmake, the developers do not have to worry themselves about the dependency graph, platform specific behaviours, or linking external packages. The vast majority of configuration, such as project name, dependencies, and license, is done via the Cargo.toml file situated in the package root.

Cargo can be configured to produce either a debug build or a release build. A debug build is less optimized for speed and binary size, but is faster to produce. A release build contains more optimizations but is much slower to produce. Release builds are produced by the release pipeline and delivered to the end user, while debug builds are more commonly used for developers to test the software locally.
Cargo also provides many functionalities via subcommands. For instance, the clean subcommand will remove all build artifacts and intermediate files to effectively restore the codebase to the state when it was cloned. The test subcommand will build and run all test cases defined in the project. The check subcommand will check the codebase for compilation errors without actually building the binary itself.

It is important to note that due to Lodestone Core’s rich feature set, it has a lot of dependencies, and by extension even more transitive dependencies (1126 to be exact). Thus the building of Lodestone Core is a highly resource intensive process. Below is a compressed image of the dependency graph of Lodestone Core to demonstrate its complexity:


#### Building Dashboard with npm

The codebase of Lodestone’s dashboard is an npm project. npm is a widely used package manager for JavaScript and TypeScript projects. With npm, developers do not have to concern themselves with the dependency graph, external package management, and platform specific behaviour. The developer declares the project’s configuration, such as name and dependencies in the package.json file situated in the project root. To build the Dashboard, Lodestone uses Webpack and Babel.

#### Building Lodestone Desktop with Cargo

The codebase of Lodestone Desktop is a cargo project that has both the dashboard and Lodestone Core included in its dependencies. Lodestone Desktop is powered by Tauri, a framework similar to Electron that allows one to combine a native web application with a backend in Rust to produce a desktop app. Tauri’s build process requires the build artifacts of the dashboard, which is obtained by building via npm first, and outputs both an executable and an installer for the platform specified.

Since Lodestone Desktop includes Tauri and Lodestone Core as a dependency on top, the build process is intensive - with a total of 2000+ transitive dependencies on Windows. This build takes well over an hour to complete on the release pipeline with cached intermediate build artifacts. 