
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  category: string;
  context: number;
  inputPrice: number;
  outputPrice: number;
  speed: string;
  openSource: boolean;
  featured: boolean;
}

export async function getModels(
  params?: {
    search?: string;
    provider?: string;
    category?: string;
    sort?: string;
  }
): Promise<AIModel[]> {
  const query = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });

  const response = await fetch(
    `/api/models?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch AI models");
  }

  const result = await response.json();

  return result.data;
}
