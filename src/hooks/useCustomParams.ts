import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseCustomParamsProps = {
  routeName?: string;
};

type SetQueryParamOptions = {
  debounce?: boolean;
  routeName?: string;
};

type RemoveQueryParamOptions = {
  routeName?: string;
};

type ClearAllQueryParamOptions = {
  routeName?: string;
};

export const useCustomParams = ({
  routeName: initialRouteName,
}: UseCustomParamsProps = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  /* -------------------------------- helpers -------------------------------- */

  const sanitizeRouteName = (name?: string) =>
    name?.replace(/^\/+/, "") || currentPath.replace(/^\/+/, "");

  const hasQuery = useMemo(
    () => searchParams.toString().length > 0,
    [searchParams],
  );

  /* ------------------------------ url builder ------------------------------- */

  const buildUpdatedURL = (
    updates: Record<string, string>,
    routeName?: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.set(encodeURIComponent(key), encodeURIComponent(value));
    });

    return `/${sanitizeRouteName(routeName)}?${params.toString()}`;
  };

  /* ------------------------------ set query --------------------------------- */

  const setQueryParam = useCallback(
    (updates: Record<string, string>, options: SetQueryParamOptions = {}) => {
      const { debounce = false, routeName } = options;
      const newURL = buildUpdatedURL(updates, routeName || initialRouteName);

      const updateURL = () => {
        const currentURL = `/${sanitizeRouteName(
          routeName || initialRouteName,
        )}?${searchParams.toString()}`;

        if (currentURL === newURL) return;
        setLoading(true);
        router.replace(newURL, { scroll: false });
      };

      if (debounce) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          updateURL();
        }, 400);
      } else {
        setLoading(true);
        updateURL();
      }
    },
    [initialRouteName, router, searchParams],
  );

  /* ----------------------------- remove query ------------------------------- */

  const removeQueryParam = (
    key: string | string[],
    valueToRemove?: string,
    options: RemoveQueryParamOptions = {},
  ) => {
    if (!hasQuery) return;

    const { routeName } = options;
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(key)) {
      key.forEach((k) => params.delete(k));
    } else if (valueToRemove) {
      const values = params.get(key)?.split(",") || [];
      const filtered = values.filter((v) => v !== valueToRemove);
      filtered.length
        ? params.set(key, filtered.join(","))
        : params.delete(key);
    } else {
      params.delete(key);
    }

    setLoading(true);

    const route = `/${sanitizeRouteName(routeName || initialRouteName)}`;
    const query = params.toString();
    router.replace(query ? `${route}?${query}` : route, { scroll: false });
  };

  /* ----------------------------- clear all ---------------------------------- */

  const clearAllQueryParam = (options: ClearAllQueryParamOptions = {}) => {
    if (!hasQuery) return;

    const { routeName } = options;
    setLoading(true);

    router.replace(`/${sanitizeRouteName(routeName || initialRouteName)}`, {
      scroll: false,
    });
  };

  /* ------------------------- stop loading on change ------------------------- */

  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  /* -------------------------------- readers -------------------------------- */

  const getQueryParam = useCallback(
    (key: string) => {
      const value = searchParams.get(key);
      return value ? decodeURIComponent(value) : null;
    },
    [searchParams],
  );

  const getArrayQueryParam = useCallback(
    (key: string) => {
      const value = getQueryParam(key);
      return value ? value.split(",").map((v) => v.trim()) : [];
    },
    [getQueryParam],
  );

  const getNumberParam = useCallback(
    (key: string, fallback = 0) => {
      const value = getQueryParam(key);
      const num = value ? Number(value) : NaN;
      return isNaN(num) ? fallback : num;
    },
    [getQueryParam],
  );

  const getBooleanParam = useCallback(
    (key: string, fallback = false) => {
      const value = getQueryParam(key);
      return value ? value === "true" || value === "1" : fallback;
    },
    [getQueryParam],
  );

  const allParams = useMemo(() => {
    const obj: Record<string, string> = {};
    for (const [k, v] of searchParams.entries()) {
      obj[decodeURIComponent(k)] = decodeURIComponent(v);
    }
    return obj;
  }, [searchParams]);

  const hasAnyQuery = hasQuery;

  return {
    // write
    setQueryParam,
    removeQueryParam,
    clearAllQueryParam,

    // read
    getQueryParam,
    getArrayQueryParam,
    getNumberParam,
    getBooleanParam,
    allParams,
    hasAnyQuery,

    // state
    loading,
  };
};
