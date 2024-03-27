# 📚 Documentation about the documentation
===============================================

This documentation was made with MkDocs + Read the Docs. 

For full documentation visit [mkdocs.org](https://www.mkdocs.org) and [readthedocs.org](https://www.readthedocs.org).

#### Mkdocs Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

#### Project layout
    .readthedocs.yaml # Read the Docs Build configuration
    mkdocs.yml    # The mkdocs configuration file.
    docs/
        index.md  # The documentation homepage.
        requirements.txt
        requirements.in
        ...       # Other markdown pages, images and other files.

📚 docs/        
A basic MkDocs project lives in `docs/`. All the `*.md` make up sections in the documentation.

⚙️ .readthedocs.yaml        
Read the Docs Build configuration is stored in `.readthedocs.yaml`.

⚙️ mkdocs.yml       
A [MkDocs configuration](https://www.mkdocs.org/user-guide/configuration/) is stored here, including a few extensions for MkDocs and Markdown. Add your own configurations here, such as extensions and themes. Remember that many extensions and themes require additional Python packages to be installed.

📍 docs/requirements.txt and docs/requirements.in       
Python dependencies are [pinned](https://docs.readthedocs.io/en/latest/guides/reproducible-builds.html) (uses [pip-tools](https://pip-tools.readthedocs.io/en/latest/)) here. Make sure to add your Python dependencies to `requirements.txt` or if you choose [pip-tools](https://pip-tools.readthedocs.io/en/latest/), edit `docs/requirements.in` and remember to run to run `pip-compile docs/requirements.in`.

📜 README.md        
Contents of the repo `README.md` are visible on Github and included on [the README page](../Project README).

Link to the official [Read the Docs Tutorial](https://docs.readthedocs.io/en/stable/tutorial/index.html).
