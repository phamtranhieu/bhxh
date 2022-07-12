import apiClient from '../../config/apiClient';

export const inforUser = async (params: any) => {
	return await apiClient.get(`/employee/${params}`);
};

export const inforUserPagination = async (
	pages: number,
	pageSize: number,
	filterSearch: string,
	sortActive: string,
) => {
	console.log(sortActive);
	return await apiClient.get(`/user/filter/${pages}/${pageSize}?searchKey=${filterSearch}&status=${sortActive}`);
};

export const creatUser = async (params: any) => {
	return await apiClient.post(`/user/create`, params);
};
export const updateUser = async (params: any) => {
	return await apiClient.put(`/user/update`, params);
};
export const resetPasssUser = async (params: any) => {
	return await apiClient.put(`/user/reset-password`, params);
};

export const changeActivityUser = async (params: any) => {
	return await apiClient.put(`/user/change-activity`, params);
};

export const deleteUser = async (params: any) => {
	return await apiClient.delete(`/user/delete`, params);
};

export const getAllUser = async () => {
	return await apiClient.get(`/user/get-all`);
};
// const abc = 'Đang hoạt động';
