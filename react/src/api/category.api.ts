import api from '.';

async function read(): Promise<Page<Category>> {
	const response = await api.get('/category');
	return response.data;
}

async function create(input: CategoryDto): Promise<JsonResponse<CreateResponse>> {
	const response = await api.post('/category', input);
	return response.data;
}

const categoryApi = {
	create,
	read,
};

export default categoryApi;
