import { IPamrasEX } from "../types/paramsExtractor.type";

type SearchParamsType = Record<string, string | string[]>;
type ExtractedParams = {
  searchTerm: string;
  page: number;
  limit: number;
  filter: Record<string, string>;
};

export const paramsExtractor = async ({
  searchParam,
}: {
  searchParam?: Promise<SearchParamsType | undefined>;
}): Promise<ExtractedParams> => {
  const searchParams = (await searchParam) ?? {};

  const getParamValue = (key: string, fallback = ""): string => {
    const value = searchParams[key];
    return typeof value === "string"
      ? value
      : Array.isArray(value)
        ? (value[0] ?? fallback)
        : fallback;
  };

  const { SEARCHTERM, PAGE, LIMIT } = IPamrasEX;

  const searchTerm = getParamValue(SEARCHTERM);
  const page = parseInt(getParamValue(PAGE, "1"), 10);
  const limit = parseInt(getParamValue(LIMIT, "10"), 10);

  const knownKeys: Set<string> = new Set(Object.values(IPamrasEX));

  const filter = Object.fromEntries(
    Object.entries(searchParams)
      .filter(([key]) => !knownKeys.has(key))
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(",") : value,
      ]),
  );

  return { searchTerm, page, limit, filter };
};
