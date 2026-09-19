export type HealthStatus = {
  status: string;
  service: string;
  timestamp: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};
