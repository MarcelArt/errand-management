import api from '.';

async function read(page: number): Promise<Page<MemberPage>> {
	const response = await api.get(`/member?page=${page}`);
	return response.data;
}

async function create(input: MemberDto): Promise<JsonResponse<CreateResponse>> {
	const response = await api.post('/member', input);
	return response.data;
}

async function remove(id: number): Promise<JsonResponse<MemberPage>> {
	const response = await api.delete(`/member/${id}`);
	return response.data;
}

async function update(id: number, input: MemberDto): Promise<JsonResponse<MemberDto>> {
	const response = await api.put(`/member/${id}`, input);
	return response.data;
}

async function getWithCategoryPriorities(memberId: number, page: number): Promise<Page<MemberWithCategoryPriority>> {
	const filters = `["member_id", ${memberId}]`;
	const query = `filters=${filters}&page=${page}`;

	const response = await api.get(`/member/priorities?${query}`);

	return response.data;
}

async function getById(id: number): Promise<JsonResponse<MemberPage>> {
	const response = await api.get(`/member/${id}`);
	return response.data;
}

const memberApi = {
	create,
	read,
	remove,
	update,
	getWithCategoryPriorities,
	getById,
};

export default memberApi;
