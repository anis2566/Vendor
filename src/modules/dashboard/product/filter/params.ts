import { parseAsString, parseAsInteger, createLoader } from "nuqs/server";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constant";

const filterParmas = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  status: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  limit: parseAsInteger
    .withDefault(DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  sort: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  inStock: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const productSearchParams = createLoader(filterParmas);
