# slack-status

A small command line utility to update your status and presence in slack. It includes `.command` files that are detected by Spotlight on macOS.

## Installation

1. Clone this repository
2. Execute `yarn install` within the repository
3. Copy the `.env.example` file to `.env`
4. Create a slack application on https://api.slack.com/apps
5. Give the following permissions to the app on the `User Token Scopes` subsection within the `permissions` section of your app:
   - `users.profile:write` to set the user status
   - `users:write` for the away command
6. Install the new app to your workspace
7. Copy the OAuth token that is generated to the `.env` file, in the `SLACK_TOKEN` variable

## Usage

Open Spotlight on your Mac with `⌘ + Space` and search for one of the files in the `commands` folder

> The first time you might need to write the full name of the .command file, i.e. `away.command`
