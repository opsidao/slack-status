import "dotenv/config";

import yargs from "yargs";
import { setStatus, setAway } from "./commands";

const COFFEE_EXPIRATION_SECONDS = process.env.COFFEE_EXPIRATION_SECONDS;
const COFFEE_MESSAGE = process.env.COFFEE_MESSAGE;
const COFFEE_SLACK_EMOJI = process.env.COFFEE_SLACK_EMOJI;
const LUNCH_EXPIRATION_SECONDS = process.env.LUNCH_EXPIRATION_SECONDS;
const LUNCH_MESSAGE = process.env.LUNCH_MESSAGE;
const LUNCH_SLACK_EMOJI = process.env.LUNCH_SLACK_EMOJI;

if (
  !COFFEE_EXPIRATION_SECONDS ||
  !COFFEE_MESSAGE ||
  !COFFEE_SLACK_EMOJI ||
  !LUNCH_EXPIRATION_SECONDS ||
  !LUNCH_MESSAGE ||
  !LUNCH_SLACK_EMOJI
) {
  console.error("Missing environment variables! Check the .env.example file");
  process.exit(1);
}

const coffeExpirationInMinutes = parseInt(COFFEE_EXPIRATION_SECONDS, 10) / 60;
const lunchExpirationInMinutes = parseInt(LUNCH_EXPIRATION_SECONDS, 10) / 60;

yargs
  .scriptName("slackStatus")
  .command(
    "coffee",
    `Sets status to '(${COFFEE_SLACK_EMOJI}) ${COFFEE_MESSAGE}' expiring in '${coffeExpirationInMinutes}' minutes`,
    async () =>
      await setStatus({
        text: COFFEE_MESSAGE,
        emoji: COFFEE_SLACK_EMOJI,
        expirationInMs: coffeExpirationInMinutes,
      }),
  )
  .command(
    "lunch",
    `Sets status to '(${LUNCH_SLACK_EMOJI}) ${LUNCH_MESSAGE}' expiring in '${lunchExpirationInMinutes}' minutes`,
    async () =>
      await setStatus({
        text: LUNCH_MESSAGE,
        emoji: LUNCH_SLACK_EMOJI,
        expirationInMs: parseInt(LUNCH_EXPIRATION_SECONDS),
      }),
  )
  .command("away", "Sets status to 'away'", setAway)
  .help().argv;
