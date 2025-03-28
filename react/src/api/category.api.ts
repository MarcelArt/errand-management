import api from ".";

async function read(): Promise<Page<Category>> {
  const response = await api.get("/category");
  return response.data;
};

const categoryApi = {
    read,
};

export default categoryApi;