import { db } from "@/drizzle/db";
import { userNotificationSettings } from "@/drizzle/schema";
import { revalidateUserNotificationSettingsCache } from "./cache/userNotificationSettings";

export async function insertUserNotificationSettings(
  settings: typeof userNotificationSettings.$inferInsert
) {
  await db
    .insert(userNotificationSettings)
    .values(settings)
    .onConflictDoNothing();

  revalidateUserNotificationSettingsCache(settings.userId);
}
