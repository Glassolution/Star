import { randomUUID } from 'node:crypto';
import { pgTable, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const waitlistUsers = pgTable('waitlist_users', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name'),
  phone: text('phone'),
  projectType: text('project_type'),
  referralSource: text('referral_source'),
  confirmed: boolean('confirmed').notNull().default(false),
  confirmationToken: text('confirmation_token'),
  position: integer('position'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type WaitlistUserInsert = typeof waitlistUsers.$inferInsert;
export type WaitlistUserSelect = typeof waitlistUsers.$inferSelect;

