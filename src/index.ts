import "dotenv/config";

import yargs from "yargs";
import { setLunch } from "./commands";

const lunchMessage = process.env.LUNCH_MESSAGE;
const lunchEmoji = process.env.LUNCH_SLACK_EMOJI;
const lunchExpirationInSeconds = process.env.LUNCH_EXPIRATION_SECONDS;

if (!lunchMessage)
  throw new Error("LUNCH_MESSAGE is not set, check your .env file");
if (!lunchEmoji)
  throw new Error("LUNCH_SLACK_EMOJI is not set, check your .env file");
if (!lunchExpirationInSeconds)
  throw new Error("LUNCH_EXPIRATION_SECONDS is not set, check your .env file");

const lunchExpirationInMinutes = parseInt(lunchExpirationInSeconds, 10) / 60;

yargs
  .scriptName("slackStatus")
  .command(
    "lunch",
    `Sets status to '(${lunchEmoji}) ${lunchMessage}' expiring in '${lunchExpirationInMinutes}' minutes`,
    () =>
      setLunch({
        text: lunchMessage,
        emoji: lunchEmoji,
        expirationInMs: parseInt(lunchExpirationInSeconds),
      }),
  )
  .help().argv;
