import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import Groq from 'groq-sdk';
import { PrismaService } from 'src/prisma/prisma.service';
import { HealthStatus, SpoilageRisk } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AiService {
  private client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  constructor(private prisma: PrismaService) {}

  async uploadFile(userId: string, file: Express.Multer.File) {
    const fileBuffer: Buffer = await fs.readFile(file.path);
    const base64Image = fileBuffer.toString('base64');

    const response = await this.client.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${file.mimetype};base64,${base64Image}` },
            },
            {
              type: 'text',
              text: `Analyze this crop image and respond ONLY with a JSON object, no markdown, no explanation, just raw JSON in this exact format:
{
  "healthStatus": "GOOD" | "DISEASED" | "BAD",
  "spoilageRisk": "LOW" | "MEDIUM" | "HIGH",
  "confidenceScore": <integer between 0 and 100>,
  "recommendation": "<one paragraph recommendation>"
}`,
            },
          ],
        },
      ],
      max_tokens: 1024,
    });

    const raw = response.choices[0].message.content ?? '';
    const parsed = JSON.parse(raw) as {
      healthStatus: HealthStatus;
      spoilageRisk: SpoilageRisk;
      confidenceScore: number;
      recommendation: string;
    };

    const scan = await this.prisma.cropScans.create({
      data: {
        farmer: { connect: { userId } },
        healthStatus: parsed.healthStatus,
        spoilageRisk: parsed.spoilageRisk,
        confidenceScore: parsed.confidenceScore,
        recommendation: parsed.recommendation,
      },
    });

    return {
      status: 'Success',
      data: scan,
    };
  }

  
  async getAllScans(userId: string) {
    const scans = await this.prisma.cropScans.findMany({
      where: { farmerId: userId },
      orderBy: { createdAt: 'desc' },
    });

    if (scans.length === 0) {
      throw new NotFoundException('No scans found');
    }

    return {
      status: 'Success',
      data: scans,
    };
  }
}