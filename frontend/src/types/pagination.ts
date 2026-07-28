export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResult<TItem> {
  items: TItem[]
  page: number
  pageSize: number
  totalItems: number
}
