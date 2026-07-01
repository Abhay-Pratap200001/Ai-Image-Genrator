import { countGenerationsSince, utcMonthStart } from "@/db/generations";
import type { SessionAuthObject } from "@clerk/backend";

export type GenerationQuotaSnapshot = {
  limit: number;
  used: number;
  remaining: number;
};

export const BILLING_PLAN_KEY = {
  free: "free",
  pro: "pro",
  studio: "studio",
} as const;

export const MONTHLY_GENRATION_LIMITS = {
  free: 3,
  pro: 75,
  studio: 175,
} as const;

export function getMonthlyGenrationLimit(
  has: SessionAuthObject["has"],
): number {
  if (has({ plan: BILLING_PLAN_KEY.studio })) {
    return MONTHLY_GENRATION_LIMITS.studio;
  }

  if (has({ plan: BILLING_PLAN_KEY.pro })) {
    return MONTHLY_GENRATION_LIMITS.pro;
  }

  return MONTHLY_GENRATION_LIMITS.free;
}

export async function getGenrationQuotaSnapshot(
  has: SessionAuthObject["has"],
  clerkUserId: string,
) {
  const limit = getMonthlyGenrationLimit(has);
  const used = await countGenerationsSince(clerkUserId, utcMonthStart());
  return {
    limit,
    used,
    remaining: Math.max(0, limit - used),
  };
}


