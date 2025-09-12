export type SortFilterItemFilter = {
  title: string;
  slug: string | null;
  sortKey: 'created_at' | 'rating' | 'price' | '-price' | 'name';
};

export const defaultSort: SortFilterItemFilter = {
  title: 'Latest arrivals',
  slug: null,
  sortKey: 'created_at'
};

export const sorting: SortFilterItemFilter[] = [
  defaultSort,
  { title: 'Top Rated', slug: 'rating', sortKey: 'rating' },
  { title: 'Name', slug: 'name', sortKey: 'name' },
  { title: 'Price: Low to high', slug: 'price', sortKey: 'price' },
  { title: 'Price: High to low', slug: '-price', sortKey: '-price' }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

