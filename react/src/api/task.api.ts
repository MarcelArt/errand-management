import api from '.';

async function read(page: number): Promise<Page<TaskPage>> {
	const response = await api.get(`/task?page=${page}`);
	return response.data;
}

async function create(input: TaskDto): Promise<JsonResponse<CreateResponse>> {
	const response = await api.post('/task', input);
	return response.data;
}

async function remove(id: number): Promise<JsonResponse<Task>> {
	const response = await api.delete(`/task/${id}`);
	return response.data;
}

async function update(id: number, input: TaskDto): Promise<JsonResponse<TaskDto>> {
	const response = await api.put(`/task/${id}`, input);
	return response.data;
}

const taskApi = {
	create,
	read,
	remove,
	update,
};

export default taskApi;
