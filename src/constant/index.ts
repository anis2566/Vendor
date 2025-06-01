export enum CATEGORY_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export const defaultCategorySlugs = [
    'electronics',
    'clothing',
    'home',
    'beauty',
    'sports',
    'outdoors',
    'health',
    'automotive',
    'toys',
    'jewelry',
    'food',
    'bags',
    'accessories',
    'books',
    'movies',
    'music',
    'games',
    'tools',
    'furniture',
    'decor',
    'lighting',
    'gardening',
    'pet',
]

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 5
export const DEFAULT_PAGE_SIZE = 5
export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 40, 50, 100, 200, 500]
export const DEFAULT_SORT_OPTIONS = [
    {
        label: "Newest",
        value: "desc",
    },
    {
        label: "Oldest",
        value: "asc",
    }
]