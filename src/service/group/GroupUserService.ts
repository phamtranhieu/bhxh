import apiClient from '../../config/apiClient';
var qs = require('querystringify');

export const paginationGroupUser = async (pageNumber: any, pageSize: any, objParams: any) => {
	let objParamUrls = qs.stringify(objParams);
	return await apiClient.get(`/user-group/filter/${pageNumber}/${pageSize}?${objParamUrls}`);
};

export const getAllGroupUser = async () => {
	return await apiClient.get(`/user-group/get-all`);
};

export const createGroupUser = async (params: any) => {
	return await apiClient.post(`/user-group/create`, params);
};

export const updateGroupUser = async (params: any) => {
	return await apiClient.put(`/user-group/update`, params);
};

export const deleteGroupUser = async (params: any) => {
	return await apiClient.delete(`/user-group/delete`, params);
};
