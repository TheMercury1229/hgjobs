import {
  experienceLevel,
  jobListingStatues,
  jobListingTypes,
  locationRequirement,
  WageInterval,
} from "@/drizzle/schema";

export const formatWageInterval = (interval: WageInterval) => {
  switch (interval) {
    case "hourly":
      return "Hourly";
    case "yearly":
      return "Yearly";
    default:
      throw new Error(`Invalid wage interval: ${interval satisfies never}`);
  }
};

export const formatLocationRequirement = (requirement: locationRequirement) => {
  switch (requirement) {
    case "in-office":
      return "In-Office";
    case "remote":
      return "Remote";
    case "hybrid":
      return "Hybrid";
    default:
      throw new Error(
        `Invalid location requirement: ${requirement satisfies never}`
      );
  }
};

export const formatExperienceLevel = (level: experienceLevel) => {
  switch (level) {
    case "junior":
      return "Junior";
    case "mid-level":
      return "Mid";
    case "senior":
      return "Senior";
    default:
      throw new Error(`Invalid experience level: ${level satisfies never}`);
  }
};

export const formatJobType = (type: jobListingTypes) => {
  switch (type) {
    case "full-time":
      return "Full-Time";
    case "part-time":
      return "Part-Time";

    case "internship":
      return "Internship";
    default:
      throw new Error(`Invalid job type: ${type satisfies never}`);
  }
};

export const formatJobListingStatus = (status: jobListingStatues) => {
  switch (status) {
    case "draft":
      return "Draft";
    case "public":
      return "Active";
    case "delisted":
      return "Delisted";
    default:
      throw new Error(`Invalid job listing status: ${status satisfies never}`);
  }
};

export function formatJobListingLocation({
  stateAbbreviation,
  city,
}: {
  stateAbbreviation: string | null;
  city: string | null;
}) {
  if (stateAbbreviation == null && city == null) return "None";

  const locationParts = [];
  if (city != null) locationParts.push(city);
  if (stateAbbreviation != null) {
    locationParts.push(stateAbbreviation.toUpperCase());
  }

  return locationParts.join(", ");
}

export const formatWage = (wage: number, interval: WageInterval) => {
  const wageFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  switch (interval) {
    case "hourly":
      return `${wageFormatter.format(wage)}/hr`;
    case "yearly":
      return `${wageFormatter.format(wage)}`;
    default:
      throw new Error(`Invalid wage interval: ${interval satisfies never}`);
  }
};
