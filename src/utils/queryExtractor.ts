import { QueryExtractor } from "../types/queryExtractor.type";

export const queryExtractor = ({
  searchTerm,
  sortBy = "created_at",
  sortOrder = "desc",
  page = 1,
  limit = 10,
  extra = {},
}: QueryExtractor): string => {
  const query = new URLSearchParams();

  // #> Set basic query options
  if (searchTerm?.trim())
    query.set("searchTerm", decodeURIComponent(searchTerm.trim()));
  query.set("sortBy", sortBy);
  query.set("sortOrder", sortOrder);
  query.set("page", Math.max(1, page).toString());
  query.set("limit", Math.max(1, limit).toString());

  // #> Append extra filters
  Object.entries(extra).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== "") {
          query.append(key, String(v));
        }
      });
    } else {
      query.set(key, String(value));
    }
  });

  return query.toString();
};
