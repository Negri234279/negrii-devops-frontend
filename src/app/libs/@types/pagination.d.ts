export interface PaginationResponse<T> {
    items: T[]
    total: number
    next: number | null
    prev: number | null
}
