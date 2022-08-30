import apiClient from '../../config/apiClient';
var qs = require('querystringify');

export const paginationGroupUser = async (pageNumber: any, pageSize: any, objParams: any) => {
	let objParamUrls = qs.stringify(objParams);
	console.log(objParams);
	return await apiClient.get(`/user-group/filter/${pageNumber}/${pageSize}?${objParamUrls}`);
};

export const getAllFunctionGroupUser = async () => {
	return await apiClient.get(`/masterdata/feature/get-all`);
};

export const getDataConfigGroup = async () => {
	return await apiClient.get(`/masterdata/config-text/DataPermission`);
};

export const getCreateConfigGroup = async () => {
	return await apiClient.get(`/masterdata/config-text/CreatePermission`);
};

export const getModifierConfigGroup = async () => {
	return await apiClient.get(`/masterdata/config-text/ModifierPermission`);
};

export const getManagerConfigGroup = async () => {
	return await apiClient.get(`/masterdata/config-text/ManagerPermission`);
};

export const getAllGroupUser = async () => {
	return await apiClient.get(`/user-group/get-all`);
};

export const createGroupUser = async (params: any) => {
	return await apiClient.post(`/user-group/create`, params);
};

export const updateGroupUser = async (params: any) => {
	console.log('params123456', params);
	return await apiClient.put(`/user-group/update`, params);
};

export const deleteGroupUser = async (params: any) => {
	console.log('params123', params);
	return await apiClient.delete(`/user-group/delete`, params);
};

export const getDetailGroupUser = async (params: string) => {
	return await apiClient.get(`/user-group/${params}`);
};
