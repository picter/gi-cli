# gi-cli

[![David DM](https://david-dm.org/noxan/gi-cli/status.svg)](https://david-dm.org/noxan/gi-cli)

Git issues command line interface.

## Config file

Make sure to have a configuration file at `$HOME/.gi.yaml`. Here an example for
its content:

    ---
    github.com:
      token: <AUTH-TOKEN>

## Commands

    $ w/gi-cli ╍ gi --help
    gi [command]

    Commands:
      <issue number>  Checkout branch for issue number.
      list            Lists all open issues of this project.               [default]
      merge           Create pull/merge request for current branch.

    Options:
      --version  Show version number                                       [boolean]
      --help     Show help                                                 [boolean]
      --all      Show all issues                                    [default: false]
