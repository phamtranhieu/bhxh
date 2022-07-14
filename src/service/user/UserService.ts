import apiClient from '../../config/apiClient';

export const inforUser = async (params: any) => {
	return await apiClient.get(`/employee/${params}`);
};

export const inforUserPagination = async (objParams: any) => {
	return await apiClient.get(
		`/user/filter/${objParams.numberPageWeb}/${objParams.sizePageWeb}?searchKey=${objParams.filterSearchWeb}&status=${objParams.sortActiveWeb}&userGroupId=${objParams.groupUserIDWeb}`,
	);
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
export const getListTextGroup = async (params: any) => {
	return await apiClient.get(`/masterdata/config-text/${params}`);
};

export const getListFunctionUser = async () => {
	return await apiClient.get(`/user-group/get-all`);
};
