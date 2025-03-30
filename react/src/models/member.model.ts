type MemberPage = {
    ID: number;
    name: string;
    maxLoad: number;
}

type MemberDto = {
    name: string;
    maxLoad: number;
}

type MemberWithCategoryPriority = {
    ID: number;
    memberId: number;
    name: string;
    categoryId: number;
    category: string;
    priority: number;
}