export type UserRole = 'user' | 'admin';

export type EventType = 'list' | 'purchase' | 'transfer';

export interface GetList<T> {
  limit: number;
  page: number;
  filters: Partial<T>;
}
