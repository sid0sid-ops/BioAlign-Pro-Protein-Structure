export const apiClient = {
  async post<T>(): Promise<{ data: T }> {
    throw new Error("BioAlign-Pro-Protein-Structure is configured for static client-side deployment; no runtime API client is available.");
  },
  async get<T>(): Promise<{ data: T }> {
    throw new Error("BioAlign-Pro-Protein-Structure is configured for static client-side deployment; no runtime API client is available.");
  }
};
