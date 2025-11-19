import { Duration } from "luxon";

export const minutesToISO = (durationInMinutes: number) =>
  Duration.fromObject({
    hours: Math.floor(durationInMinutes / 60),
    minutes: durationInMinutes % 60,
  }).toISO(); // => "PT1H30M"

export const minutesToHuman = (durationInMinutes: number) => {
  if (durationInMinutes < 0) return "Invalid duration";
  return Duration.fromObject({
    hours: Math.floor(durationInMinutes / 60),
    minutes: durationInMinutes % 60,
  }).toHuman(); // => "1 hour, 30 minutes"
};

export const isoToMinutes = (iso: string) =>
  Duration.fromISO(iso).as("minutes");

export const isoToHuman = (iso: string) => minutesToHuman(isoToMinutes(iso));
