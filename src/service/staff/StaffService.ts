import apiClient from '../../config/apiClient';

export const inforStaff = async (params: any) => {
	return await apiClient.get(`/employee/${params}`);
};
export const inforStaffAll = async () => {
	return await apiClient.get(`/employee/get-all`);
};
export const inforStaffPagination = async (pages: number, pageSize: number) => {
	return await apiClient.get(`/employee/filter/${pages}/${pageSize}`);
};

export const creatStaff = async (params: any) => {
	return await apiClient.post(`/employee/create`, params);
};

export const updateStaff = async (params: any) => {
	return await apiClient.put(`/employee/update`, params);
};

export const deleteStaff = async (params: any) => {
	return await apiClient.delete(`/employee/delete`, params);
};

export const statusStaff = async (params: any) => {
	return await apiClient.put(`/employee/change-status`, params);
};
