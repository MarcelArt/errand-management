import api from '.';

async function read(page: number): Promise<Page<Category>> {
	const response = await api.get(`/category?page=${page}`);
	return response.data;
}

async function create(input: CategoryDto): Promise<JsonResponse<CreateResponse>> {
	const response = await api.post('/category', input);
	return response.data;
}

async function remove(id: number): Promise<JsonResponse<Category>> {
	const response = await api.delete(`/category/${id}`);
	return response.data;
}

async function update(id: number, input: CategoryDto): Promise<JsonResponse<CategoryDto>> {
	const response = await api.put(`/category/${id}`, input);
	return response.data;
}

async function dropdown(): Promise<Category[]> {
	const count = await api.get('/category?size=1');
	const firstData = count.data as Page<Category>;
	
	const all = await api.get(`/category?size=${firstData.total}`);
	const allData = all.data as Page<Category>;

	return allData.items;
}

const categoryApi = {
	create,
	read,
	remove,
	update,
	dropdown,
};

export default categoryApi;
