export interface ApiRate {
  value: number;
  count: number;
}

export interface ApiType {
  id: number;
  name: string;
  price: number;
  beforeOffPrice: number;
}
export interface ApiAuthor {
  id: number;
  firstName: string;
  lastName: string;
  type: number;
  slug: string;
}
export interface ApiBook {
  id: number;
  title: string;
  sourceBookId: number;
  hasPhysicalEdition: boolean;
  canonicalId: number;
  subtitle: string;
  PublisherID: number;
  publisherSlug: string;
  price: number;
  numberOfPages: number;
  rating: number;
  rates: ApiRate[];
  types: ApiType[];
  beforeOffPrice: number;
  isRtl: boolean;
  showOverlay: true;
  PhysicalPrice: number;
  physicalBeforeOffPrice: number;
  publishDate: string;
  destination: number;
  type: string;
  coverUri: string;
  shareUri: string;
  shareText: string;
  publisher: string;
  authors: ApiAuthor[];
  labels: [];
  subscriptionAvailable: boolean;
  state: number;
  encrypted: boolean;
  currencyPrice: number;
  currencyBeforeOffPrice: number;
}
interface ApiSpinnerItem {
  id: number;
  title: string;
}
interface ApiBookList {
  books: ApiBook[];
  tabSeparated: boolean;
  spinnerItems: ApiSpinnerItem[];
  currentSpinnerPosition: number;
}

export interface ApiResponse {
  bookList: ApiBookList;
  hasMore: boolean;
  nextOffset: string;
  seoDate: any;
  tpv: string;
}
