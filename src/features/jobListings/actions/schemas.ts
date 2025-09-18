import {
  experienceLevel,
  jobListingTypes,
  locationRequirement,
  wageIntervals,
} from "@/drizzle/schema";
import { z } from "zod";
export const jobListingSchema = z
  .object({
    title: z.string().min(1, "Required"),
    description: z.string().min(10, "Must be at least 10 characters"),
    experienceLevel: z.enum(experienceLevel),
    locationRequirement: z.enum(locationRequirement),
    type: z.enum(jobListingTypes),
    wage: z.number().int().positive().min(1, "Required").nullable(),
    wageIntervals: z.enum(wageIntervals).nullable(),
    stateAbbreviation: z
      .string()
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable(),
    city: z
      .string()
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable(),
  })
  .refine(
    (listing) => {
      return listing.locationRequirement === "remote" || listing.city != null;
    },
    {
      message: "Required for non-remote jobs",
      path: ["city"],
    }
  )
  .refine(
    (listing) => {
      return (
        listing.locationRequirement === "remote" ||
        listing.stateAbbreviation != null
      );
    },
    {
      message: "Required for non-remote jobs",
      path: ["stateAbbreviation"],
    }
  );
