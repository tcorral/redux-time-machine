# Contributing to ReduxTimeMachine

Thanks for taking the time to contribute! ReduxTimeMachine is a volunteer-run project and we couldn't do it without your help.

This document includes a set of guidelines for contributing to ReduxTimeMachine. These are guidelines, not rules. If something seems off, please feel free to propose changes to this document in a pull request.

## Table of Contents

- [Contributing to ReduxTimeMachine](#contributing-to-reduxtimemachine)
  - [Table of Contents](#table-of-contents)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Bug Reports](#bug-reports)
    - [Suggestions](#suggestions)
    - [Code](#code)
  - [Setup - Git, GitHub, and Node](#setup---git-github-and-node)
      - [Installation](#installation)
  - [Linting, Building, and Testing](#linting-building-and-testing)
      - [Linting](#linting)
      - [Building](#building)
      - [Testing](#testing)
  - [Pull Requests](#pull-requests)
  - [Updating Your Branch](#updating-your-branch)


## How Can I Contribute?

### Bug Reports

This section guides you through submitting a bug report for ReduxTimeMachine. Following these guidelines helps others understand your report and resolve the issue.

Before creating a bug report please check [this list][bugs] list to see if it has already been reported. If the issue is closed, please open a new issue and link to the original issue.

When creating a bug report, explain the problem and include as much additional information as necessary to help maintainers reproduce it. Ideally, provide an example project which highlights the problem.

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe your project setup**. The easier it is for maintainers to reproduce your problem, the more likely it is to be fixed quickly.
- **Explain what you expected to see instead and why**

### Suggestions

This section guides you through submitting an enhancement suggestion for ReduxTimeMachine.

Before creating a feature request, please check [this list][suggestions] to see if it has already been requested.

When creating an enhancement request, explain your use case and ultimate goal. This will make it possible for contributors to suggest existing alternatives which may already meet your requirements.

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide an example where this enhancement would improve ReduxTimeMachine**
- **If possible, list another documentation generator where this feature exists**

### Code

Unsure of where to begin contributing to ReduxTimeMachine? You can start by looking through the issues labeled [good-first-issue] and [help-wanted]. Issues labeled with [good-first-issue] should only require changing a few lines of code and a test or two. Issues labeled with [help-wanted] can be considerably more involved and may require changing multiple files.

For instructions on setting up your environment, see the [setup](#setup---git-github-and-node) instructions in this document.

If you have started work on an issue and get stuck or want a second opinion on your implementation feel free to reach out through [Gitter].

## Setup - Git, GitHub, and Node

If you don't already have [Git] installed, install it first. You will need it to contribute to ReduxTimeMachine. You will also need to install [Node]. ReduxTimeMachine requires at least npm 4, so if you are running Node 7.3.0 or older you will need to upgrade npm using `npm install --global npm@^4`.

#### Installation

1. Fork the ReduxTimeMachine repository - https://github.com/tcorral/redux-hub/fork
1. Open a terminal, or "Git Bash" on Windows.
1. Use `cd` to move to the directory that you want to work in.
1. Clone your repository, replace USER with your GitHub username:
   ```bash
   git clone https://github.com/USER/redux-hub
   ```
1. Add the ReduxTimeMachine repo as a remote repository
   ```bash
   git remote add redux-hub https://github.com/tcorral/redux-hub
   ```
1. Install dependencies and build the latest version:
   ```bash
   npm install
   ```
1. Open the redux-hub folder in your favorite editor. If you don't have one, try [Visual Studio Code][VSCode] or [Atom]

## Linting, Building, and Testing

Once you have cloned ReduxTimeMachine, you can lint, build, and test the code from your terminal.

#### Linting

To lint the ReduxTimeMachine code, run `npm run lint`. This will start tslint and check all files for stylistic problems. You can also install a tslint plugin for your editor to show most style problems as you type.

You can automatically fix some style problems by running `npm run lint -- --fix`.

#### Building

To compile the ReduxTimeMachine source, run `npm run compile`. This will start the TypeScript compiler and output the compiled JavaScript to the `dist` folder. If you want to build and test in one step, run `npm run build`.

#### Testing

ReduxTimeMachine includes an extensive set of tests that describe its output. To validate any changes you have made, build the project and then run `npm test`. Alternatively, to rebuild with your changes and then immediately test, run `npm run build`.

## Pull Requests

Once you have finished working on an issue, you can submit a pull request to have your changes merged into the ReduxTimeMachine repository and included in the next release.

Before submitting a pull request, make sure that there are no linting problems (`npm run lint`), all tests pass (`npm test`), and your branch is up to date. Its also a good idea to join the ReduxTimeMachine [Gitter] room to discuss how best to implement changes.

Please do not change the project version number in a pull request.

## Updating Your Branch

If the ReduxTimeMachine repository has changed since you originally forked it, you will need to update your repository with the latest changes before submitting a pull request. To pull the latest changes from the ReduxTimeMachine repo, run `git pull redux-hub master`.

[bugs]: https://github.com/tcorral/redux-hub/labels/bug
[suggestions]: https://github.com/tcorral/redux-hub/labels/enhancement
[good-first-issue]: https://github.com/tcorral/redux-hub/labels/good%20first%20issue
[help-wanted]: https://github.com/tcorral/redux-hub/labels/help%20wanted

[Gitter]: https://gitter.im/tcorral/redux-hub
[GitHub]: https://github.com
[Git]: https://git-scm.com
[Node]: https://nodejs.org/en/
[VSCode]: https://code.visualstudio.com/
[Atom]: https://atom.io/