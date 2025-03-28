type Page<T> = {
    items: T[];
    page: number;
    size: number;
    max_page: number;
    total_pages: number;
    total: number;
    last: boolean;
    first: boolean;
    visible: number;
}