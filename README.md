# gi-cli

[![Build Status](https://travis-ci.org/picter/gi-cli.svg?branch=master)](https://travis-ci.org/picter/gi-cli)
[![David DM](https://david-dm.org/picter/gi-cli/status.svg)](https://david-dm.org/picter/gi-cli)

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
      gi <issue number>         Checkout branch for issue number.
      gi list                   Lists all open issues of this project.
      gi pr                     Create pull/merge request for current branch.
                                                                    [aliases: merge]
      gi release [new-version]  Release current branch.

    Options:
      --version  Show version number                                       [boolean]
      --help     Show help                                                 [boolean]
