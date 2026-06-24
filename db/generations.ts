import { and, count, desc, eq, gte, type  InferInsertModel } from "drizzle-orm";
import { generations } from "@/db/schema";
import { db } from "@/db/index";



//to know how many genrtaion user has used
export function utcMonthStart(){
    const n = new Date();
    return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 1, 0, 0, 0, 0));
}


// for to knoe hoe many genration has left to this user 
export async function countGenerationsSince(clerkUserId: string, since: Date) {
  const [row] = await db
    .select({ c: count() })
    .from(generations)
    .where(and(eq(generations.clerkUserId, clerkUserId), gte(generations.createdAt, since)));

  return Number(row?.c ?? 0);
}


//for tracking the user history for user image genration
export async function listUserGenerationSummaries(clerkUserId: string) {
  return db
    .select()
    .from(generations)
    .where(eq(generations.clerkUserId, clerkUserId))
    .orderBy(desc(generations.createdAt));
}



type InsertGenerationInput = Omit<InferInsertModel<typeof generations>, "id" | "createdAt">;


//For genrating the image   
export async function createGeneration(input: InsertGenerationInput) {
  const [row] = await db.insert(generations).values(input).returning();

  return row;
}