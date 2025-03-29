type JsonResponse<T> = {
    items: T;
    isSuccess: boolean;
    message: string;
}

type CreateResponse = {
    ID: number;
}