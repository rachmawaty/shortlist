import { eq, desc, and } from "drizzle-orm";
import { db } from "./db";
import { resumes, jobs, type Resume, type InsertResume, type Job, type InsertJob } from "@shared/schema";

export interface IStorage {
  getResume(userId: string): Promise<Resume | null>;
  upsertResume(data: InsertResume): Promise<Resume>;
  getAllJobs(userId: string): Promise<Job[]>;
  getJob(id: number, userId: string): Promise<Job | undefined>;
  createJob(data: InsertJob): Promise<Job>;
  updateJob(id: number, userId: string, data: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: number, userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getResume(userId: string): Promise<Resume | null> {
    const rows = await db.select().from(resumes).where(eq(resumes.userId, userId)).orderBy(desc(resumes.createdAt)).limit(1);
    return rows[0] || null;
  }

  async upsertResume(data: InsertResume): Promise<Resume> {
    await db.delete(resumes).where(eq(resumes.userId, data.userId));
    const [resume] = await db.insert(resumes).values(data).returning();
    return resume;
  }

  async getAllJobs(userId: string): Promise<Job[]> {
    return db.select().from(jobs).where(eq(jobs.userId, userId)).orderBy(desc(jobs.createdAt));
  }

  async getJob(id: number, userId: string): Promise<Job | undefined> {
    const [job] = await db.select().from(jobs).where(and(eq(jobs.id, id), eq(jobs.userId, userId)));
    return job;
  }

  async createJob(data: InsertJob): Promise<Job> {
    const [job] = await db.insert(jobs).values(data).returning();
    return job;
  }

  async updateJob(id: number, userId: string, data: Partial<InsertJob>): Promise<Job | undefined> {
    const [job] = await db.update(jobs).set(data).where(and(eq(jobs.id, id), eq(jobs.userId, userId))).returning();
    return job;
  }

  async deleteJob(id: number, userId: string): Promise<void> {
    await db.delete(jobs).where(and(eq(jobs.id, id), eq(jobs.userId, userId)));
  }
}

export const storage = new DatabaseStorage();
