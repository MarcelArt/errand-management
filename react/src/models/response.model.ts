type JsonResponse<T> = {
    items: T;
    isSuccess: boolean;
    message: string;
}

interface CreateResponse {
    ID: number;
}