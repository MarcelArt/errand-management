import api from ".";

async function upsert(input: MemberCategoryPriorityDto, id?: number): Promise<JsonResponse<CreateResponse | MemberCategoryPriorityDto>> {
    if (id) {
        const response = await api.put(`/member-category-priority/${id}`, input);
        return response.data;
    } else {
        const response = await api.post('/member-category-priority', input);
        return response.data;
    }
}

const memberCategoryPriorityApi = {
    upsert,
};

export default memberCategoryPriorityApi;
