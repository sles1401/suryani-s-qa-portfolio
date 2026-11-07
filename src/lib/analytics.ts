import { track } from "@vercel/analytics";

type EventData = Record<string, string | number | boolean>;

export const trackEvent = (name: string, data: EventData = {}) => {
  try {
    track(name, data);
  } catch {
    // Analytics is best-effort; never block navigation.
  }
};
