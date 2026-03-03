"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

// import { resolveModelName } from "@/utils/modelResolver";
// import { hasPermission, parseAccessRules } from "@/utils/accessControl";
// import { buildDomainIdentifier } from "@/utils/buildDomainIdentifier";

import { logger } from "@/src/utils/logger";
import {
  API_BASE_URL,
  API_V1_BASE_URL,
} from "@/src/constants/convention.api.constant";

interface GenericMutationParams {
  route: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  data?: string;
  id?: string;
  ids?: string[];
  requireAuth?: boolean;
  requireShopId?: boolean;
  pathToRevalidate?: string | string[];
  tagsToRevalidate?: string | string[];
  requireAccessControl?: boolean;
  modelName?: string;
}

export const mutation = async ({
  route,
  method,
  data,
  id,
  ids,
  requireShopId = false,
  requireAuth = true,
  pathToRevalidate = "",
  tagsToRevalidate = "",
  requireAccessControl = true,
  modelName,
}: GenericMutationParams) => {
  try {
    const cookieStore = await cookies();
    let accessToken: string | undefined;
    let subdomain: string | undefined;

    // #> 1. AUTHENTICATION
    if (requireAuth) {
      accessToken = cookieStore.get("accessToken")?.value;
      if (!accessToken) {
        const msg = "You are not authorized to perform this action!";
        logger(msg);
        return { message: msg };
      }
    }

    // #> 2. SHOP IDENTIFIER (if needed)
    if (requireShopId) {
      subdomain = cookieStore.get("shopSubdomain")?.value;
      if (!subdomain) {
        const msg = "Shop identifier not found!";
        logger(msg);
        return { message: msg };
      }
    }

    // #> 3. ACCESS CONTROL (role-based)
    // if (requireAuth && requireAccessControl && accessToken) {
    //   const rulesRaw = cookieStore.get("accessRules")?.value;
    //   const rules = parseAccessRules(rulesRaw);

    //   // #> Added modelName props for easier way to extract it.
    //   const rawModel = modelName ? modelName : route?.split("/")[1];
    //   const model = resolveModelName(rawModel);

    //   const methodToAction: Record<
    //     string,
    //     "read" | "write" | "update" | "delete"
    //   > = {
    //     GET: "read",
    //     POST: "write",
    //     PUT: "update",
    //     PATCH: "update",
    //     DELETE: "delete",
    //   };

    //   const action = methodToAction[method];
    //   if (!hasPermission(rules, model, action)) {
    //     const msg = "Permission is denied for this role!";
    //     logger(msg);
    //     return { success: false, message: msg };
    //   }
    // }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (requireAuth && accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // if (requireShopId && subdomain) {
    //   const identifier = buildDomainIdentifier(subdomain, API_BASE_URL);
    //   headers["x-app-identifier"] = identifier;
    // }
    let url = `${API_V1_BASE_URL}${route}`;
    if (method === "DELETE" && id) {
      url += `/${id}`;
    }

    // Determine body payload for DELETE with multiple ids or other methods
    let body: string | undefined = undefined;

    if (method === "DELETE" && ids && ids.length > 0) {
      body = JSON.stringify({ ids });
    } else if (method !== "DELETE" && data) {
      body = data;
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const result = await response.json();

    // #> Revalidate by paths
    const paths = Array.isArray(pathToRevalidate)
      ? pathToRevalidate
      : [pathToRevalidate];
    paths.forEach((path) => typeof path === "string" && revalidatePath(path));

    // #> Revalidate by tags
    const tags = Array.isArray(tagsToRevalidate)
      ? tagsToRevalidate
      : [tagsToRevalidate];
    tags.forEach(
      (tag) => typeof tag === "string" && revalidateTag(tag, { expire: 0 }),
    );

    return result;
  } catch (error) {
    logger(error);
    return {
      success: false,
      message: "An error occurred during the mutation.",
    };
  }
};
