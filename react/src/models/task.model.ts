type Task = {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    priority: number;
    name: string;
    eta: number;
    remainingEta: number;
    isAvailable: boolean;
    doneAt: Date;
    categoryId: number;
    category: Category;
}

type TaskPage = {
    ID: number;
    priority: number;
    name: string;
    eta: number;
    remainingEta: number;
    isAvailable: boolean;
    doneAt: Date;
    categoryId: number;
    category: string;
}

type TaskDto = {
    categoryId: number;
    eta: number;
    isAvailable: boolean;
    name: string;
    priority: number;
    remainingEta: number;
    doneAt?: Date;
}