export interface ApiError {
  status: number;
  data: {
    message: string;
    error?: string;
  };
}

export interface Profile {
  id: string;
  email: string;
  name: string;
} 