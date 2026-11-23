export type AIModel = {
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
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
};
