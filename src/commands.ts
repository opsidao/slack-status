/* eslint-disable @typescript-eslint/camelcase */
import { WebClient } from "@slack/web-api";

const webClient = new WebClient(process.env.SLACK_TOKEN);

interface LunchParams {
  text: string;
  emoji: string;
  expirationInMs: number;
}

export const setStatus = async ({
  text,
  emoji,
  expirationInMs,
}: LunchParams): Promise<void> => {
  try {
    const { profile } = await webClient.users.profile.set({
      profile: JSON.stringify({
        status_text: text,
        status_emoji: emoji,
        status_expiration: (
          new Date().getTime() / 1000 +
          expirationInMs
        ).toString(),
      }),
    });

    if (profile) {
      const { status_text, status_emoji, status_expiration } = profile;

      console.log(
        "Status set to:",
        status_text,
        status_emoji,
        status_expiration && new Date(status_expiration * 1000),
      );
    } else {
      console.warn("No profile in response!");
    }

    process.exit(0);
  } catch (error) {
    console.error("Request failed:", error);
    process.exit(1);
  }
};

export const setAway = async (): Promise<void> => {
  try {
    await webClient.users.setPresence({ presence: "away" });

    console.log("Away status set");
    process.exit(0);
  } catch (error) {
    console.error("Request failed:", error);
    process.exit(1);
  }
};
