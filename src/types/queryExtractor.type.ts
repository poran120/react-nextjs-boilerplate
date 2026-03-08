export type QueryExtractor = {
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  extra?: Record<string, unknown>;
};
