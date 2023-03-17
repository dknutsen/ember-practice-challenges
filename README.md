# Ember Practice Challenges

This app is an Ember.js app with "challenges" intended to help practice Javascript and Ember concepts. The idea is to bridge the gap between reading docs and build a real-world app by practicing specific concepts via test-driven problem solving.

## Basic Structure

### Challenge format
The challenges are divided into categories. When the app is booted each category is rendered in the sidebar as a collapsible list. Clicking the challenge title will "load" the challenge in the main content area. Each challenge is focused on one specific subject related to Javascript and Ember development, and is meant to be a way to practice a technique or tool after reading about it or learning it conceptually.

A challenge is made up of one or more files that render a route or component and one or more tests. The tests are failing by default and to "complete" the challenge your goal is to make the tests pass.

As rendered in the app, each challenge contains a brief description, a list of files to edit, and a "challenge area" where the main challenge component and/or route will be rendered. The prompt for each challenge will be either in the challenge description or the main challenge component file, depending on the challenge. The prompts are sometimes ambiguous by design. To complete the challenge, write code that makes the test pass

### Recommended workflow

1. Start the app (`ember serve`) and visit the challenges app at [http://localhost:4200](http://localhost:4200).
2. Select a challenge from the sidebar.
3. Read the challenge description, and open the file or files in the files list.
4. Click the "Open challenge tests" link to open the tests for that challenge.
4. Write code to complete the challenge, checking the test runner output.
5. When the tests are all passing you have completed the challenge!
6. To check your code against the sample solution run `./solution <challenge id>` e.g. `./solution autotracking.deep-tracking`

It is recommended that you commit your solutions in a git branch and optionally push it to a fork of the repo if you'd like.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (recommend installing via nvm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <ssh-repository-url>` this repository
* `cd ember-practice-challenges`
* `npm install`

### Editor Integrations
NOTE: at the time of writing gjs/gts support is still somewhat experimental and may require a slight amount of extra config. To set up lint integration use the following guides.

#### VSCode

For syntax highlighting you should install the [Glimmer Syntax plugin](https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-glimmer-syntax)

Install the [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and configure it with the following settings:
```
  "eslint.probe": [
    // likely some other stuff here
    "glimmer-ts",
    "glimmer-js"
  ],
  "eslint.validate": [
    // likely some other stuff here
    "glimmer-ts",
    "glimmer-js"
  ]
```

Also recommend installing the prettier plugin and setting VSCode user settings to:
```
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

An example minimal config with the above is:
```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.probe": ["glimmer-ts", "glimmer-js"],
  "eslint.validate": ["glimmer-ts", "glimmer-js"],
  "js/ts.implicitProjectConfig.experimentalDecorators": true
}
```

#### Neovim

For neovim the recommended way to get syntax highlighting is via treesitter. You should also consider plugins for ESLint and Prettier but how this should look depends on your nvim config.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
