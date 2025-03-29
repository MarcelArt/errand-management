import api from '.';

async function read(): Promise<Page<Category>> {
	const response = await api.get('/category');
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

const categoryApi = {
	create,
	read,
	remove,
};

export default categoryApi;
