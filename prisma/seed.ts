
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const models = [
  {
    name: "GPT-4.1",
    provider: "OpenAI",
    category: "General",
    description: "Advanced AI model for coding and general tasks.",
    context: 1000000,
    inputPrice: 2,
    outputPrice: 8,
    speed: "Fast",
    openSource: false,
    featured: true,
  },
  {
    name: "Claude Sonnet 4",
    provider: "Anthropic",
    category: "Coding",
    description: "AI model for coding and complex reasoning.",
    context: 200000,
    inputPrice: 3,
    outputPrice: 15,
    speed: "Fast",
    openSource: false,
    featured: true,
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    category: "Reasoning",
    description: "Multimodal AI model for reasoning tasks.",
    context: 1000000,
    inputPrice: 1.25,
    outputPrice: 10,
    speed: "Medium",
    openSource: false,
    featured: true,
  },
  {
    name: "Llama 3.3 70B",
    provider: "Meta",
    category: "Open Source",
    description: "Open-weight language model.",
    context: 128000,
    inputPrice: 0,
    outputPrice: 0,
    speed: "Fast",
    openSource: true,
    featured: false,
  },
  {
    name: "DeepSeek R1",
    provider: "DeepSeek",
    category: "Reasoning",
    description: "Reasoning-focused AI model.",
    context: 128000,
    inputPrice: 0,
    outputPrice: 0,
    speed: "Medium",
    openSource: true,
    featured: true,
  },
];

async function main() {
  for (const model of models) {
    await prisma.aIModel.upsert({
      where: { name: model.name },
      update: model,
      create: model,
    });
  }

  console.log("Successfully seeded AI models!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
