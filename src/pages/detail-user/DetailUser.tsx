import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Checkbox, Select, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
	EditOutlined,
	KeyOutlined,
	LikeOutlined,
	DislikeOutlined,
	EyeOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import {
	getAllFunctionGroupUser,
	getCreateConfigGroup,
	getManagerConfigGroup,
	getModifierConfigGroup,
	getDataConfigGroup,
	createGroupUser,
	getDetailGroupUser,
	updateGroupUser,
} from '../../service/group/GroupUserService';
import { GroupItemType, ItemChildType, ItemConfig } from '../../interface/group/UserGroupType';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { titleFunction } from '../../service/group/DataUserService';

interface DataType {
	key: number;
	roleUser: any;
	numberUser: any;
	action: any;
	idUser: string;
}

export default function DetailUser() {
	const navigate = useNavigate();
	const { Option } = Select;
	const [formIdUser] = Form.useForm();
	const [valueChecked, setValueChecked] = useState<boolean>(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [dataUserGroup, setDataUserGroup] = useState([]);
	const [dataConfig, setDataConfig] = useState([]);
	const [createConfig, setCreateConfig] = useState([]);
	const [modifierConfig, setModifierConfig] = useState([]);
	const [managerConfig, setManagerConfig] = useState([]);
	const [dataUserGroupID, setDataUserGroupID] = useState<any>();
	const paramsIdUser = searchParams.get('idUser');
	console.log('dataConfig', dataConfig);
	useEffect(() => {
		getDataConfigGroup()
			.then(res => {
				console.log('response', res);
				setDataConfig(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getCreateConfigGroup()
			.then(res => {
				console.log(res);
				setCreateConfig(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getModifierConfigGroup()
			.then(res => {
				console.log(res);
				setModifierConfig(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getManagerConfigGroup()
			.then(res => {
				console.log(res);
				setManagerConfig(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getDetailGroupUser(paramsIdUser!)
			.then(res => {
				console.log(res);
				setDataUserGroupID(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	if (dataUserGroupID) {
		formIdUser.setFieldsValue({
			name: dataUserGroupID.name,
			isAdmin: dataUserGroupID.isAdmin,
			modules: dataUserGroupID.modules,
		});
	}

	const defaultData = dataConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const defaultCreate = createConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const defaultModifier = modifierConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const defaultManager = managerConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const onFinish = (values: any) => {
		console.log('values', values);

		const arrayModules = values.modules.map((item: any, index: number) => {
			return {
				...item,
				features: item.features.map((itemChild: any, indexChild: number) => {
					return {
						...itemChild,
						createPermission:
							typeof itemChild.createPermission === 'string'
								? JSON.parse(itemChild.createPermission)
								: itemChild.createPermission,
						dataPermission:
							typeof itemChild.createPermission === 'string'
								? JSON.parse(itemChild.createPermission)
								: itemChild.createPermission,
						managerPermission:
							typeof itemChild.createPermission === 'string'
								? JSON.parse(itemChild.createPermission)
								: itemChild.createPermission,
						modifierPermission:
							typeof itemChild.createPermission === 'string'
								? JSON.parse(itemChild.createPermission)
								: itemChild.createPermission,
					};
				}),
			};
		});
		const paramsSend = {
			...values,
			id: paramsIdUser,
			modules: arrayModules,
		};

		updateGroupUser(paramsSend)
			.then(res => {
				console.log(res);
				message.success('Bạn đã thay đổi thông tin nhóm người dùng thành công');
				formIdUser.resetFields();
				navigate('/home');
			})
			.catch(err => {
				console.log(err);
			});
	};
	const handleChecked = (e: any) => {
		setValueChecked(e.target.checked);
	};
	const handleChange = (e: any) => {
		console.log(e);
	};
	return (
		<div>
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 32 }}
				name="dynamic_form_nest_item"
				onFinish={onFinish}
				autoComplete="off"
				initialValues={{ modules: [''], features: [''] }}
				form={formIdUser}
			>
				<div className="flex justify-between mb-5">
					<h1>CHI TIẾT VAI TRÒ CỦA NGƯỜI DÙNG</h1>
					<div>
						<Button>Trở về</Button>
						<Button className="ml-5" type="primary" htmlType="submit">
							Chỉnh sửa
						</Button>
					</div>
				</div>
				<div>
					<Form.Item
						label={<label>Vai trò người dùng (*)</label>}
						name="name"
						rules={[{ required: true, message: 'Vui lòng nhập vai trò của người dùng' }]}
					>
						<Input className="w-[200px]" />
					</Form.Item>

					<Form.Item name="isAdmin" valuePropName="" wrapperCol={{ offset: 8, span: 16 }}>
						<Checkbox checked={valueChecked} onChange={handleChecked}>
							Thuộc nhóm toàn quyền quản lý hệ thống
						</Checkbox>
					</Form.Item>

					<p>Phân quyền chi tiết (*)</p>

					<div className="flex justify-between border-b-2 border-b-border-gray">
						{titleFunction.map((item, index) => {
							return <p>{item.title}</p>;
						})}
					</div>
					<div className="mt-5 flex w-full">
						<div className="w-full">
							<Form.List name="modules">
								{(fields, { add, remove }) => (
									<>
										{dataUserGroupID?.modules.map((itemDad: any, indexDad: any) => {
											return (
												<>
													<div className="hidden">
														<Form.Item
															name={[indexDad, 'id']}
															valuePropName={itemDad.id}
															className="hidden"
															initialValue={itemDad.id}
														></Form.Item>
														<Form.Item
															name={[indexDad, 'name']}
															valuePropName={itemDad.name}
															className="hidden"
															initialValue={itemDad.name}
														></Form.Item>
														<Form.Item
															name={[indexDad, 'description']}
															valuePropName={itemDad.description}
															className="hidden"
															initialValue={itemDad.description}
														></Form.Item>
														<Form.Item
															name={[indexDad, 'sortOrder']}
															valuePropName={itemDad.sortOrder}
															className="hidden"
															initialValue={itemDad.sortOrder}
														></Form.Item>
													</div>
													<Form.Item key={indexDad}>
														<h1>{itemDad.description}</h1>
														<Form.List name={[indexDad, 'features']}>
															{(fields, { add, remove }) => (
																<>
																	{itemDad.features.map(
																		(item: any, indexChild: number) => {
																			return (
																				<div className="flex" key={indexChild}>
																					<p className="w-[200px]">
																						{item.description}
																					</p>
																					<Space
																						style={{
																							display: 'flex',
																							marginBottom: 8,
																							marginLeft: '10rem',
																						}}
																						className="w-full flex justify-between"
																						align="baseline"
																					>
																						<div className="hidden">
																							<Form.Item
																								name={[
																									indexChild,
																									'id',
																								]}
																								valuePropName={item.id}
																								className="hidden"
																								initialValue={item.id}
																							></Form.Item>
																							<Form.Item
																								name={[
																									indexChild,
																									'name',
																								]}
																								valuePropName={
																									item.name
																								}
																								className="hidden"
																								initialValue={item.name}
																							></Form.Item>
																							<Form.Item
																								name={[
																									indexChild,
																									'description',
																								]}
																								valuePropName={
																									item.description
																								}
																								className="hidden "
																								initialValue={
																									item.description
																								}
																							></Form.Item>
																							<Form.Item
																								name={[
																									indexChild,
																									'sortOrder',
																								]}
																								valuePropName={
																									item.sortOrder
																								}
																								className="hidden"
																								initialValue={
																									item.sortOrder
																								}
																							></Form.Item>
																						</div>
																						<Form.Item
																							name={[
																								indexChild,
																								'dataPermission',
																							]}
																							className="w-[150px]"
																							initialValue={defaultData}
																						>
																							<Select
																								className="w-full"
																								defaultValue={
																									defaultData
																								}
																								disabled={valueChecked}
																								onChange={(e: any) => {
																									handleChange(e);
																								}}
																							>
																								{dataConfig.map(
																									(
																										itemData: any,
																										indexData: number,
																									) => {
																										return (
																											<Option
																												key={
																													indexData
																												}
																												value={JSON.stringify(
																													itemData,
																												)}
																											>
																												{
																													itemData.displayText
																												}
																											</Option>
																										);
																									},
																								)}
																							</Select>
																						</Form.Item>
																						<Form.Item
																							name={[
																								indexChild,
																								'createPermission',
																							]}
																							className="w-[150px]"
																							initialValue={defaultCreate}
																						>
																							<Select
																								className="w-full"
																								defaultValue={
																									defaultCreate
																								}
																								disabled={valueChecked}
																							>
																								{createConfig.map(
																									(
																										itemCreate: any,
																										indexCreate: number,
																									) => {
																										return (
																											<Option
																												key={
																													indexCreate
																												}
																												value={JSON.stringify(
																													itemCreate,
																												)}
																											>
																												{
																													itemCreate.displayText
																												}
																											</Option>
																										);
																									},
																								)}
																							</Select>
																						</Form.Item>
																						<Form.Item
																							name={[
																								indexChild,
																								'modifierPermission',
																							]}
																							className="w-[150px]"
																							initialValue={
																								defaultModifier
																							}
																						>
																							<Select
																								className="w-full"
																								defaultValue={
																									defaultModifier
																								}
																								disabled={valueChecked}
																							>
																								{modifierConfig.map(
																									(
																										itemModifier: any,
																										indexModifier: number,
																									) => {
																										return (
																											<Option
																												key={
																													indexModifier
																												}
																												value={JSON.stringify(
																													itemModifier,
																												)}
																											>
																												{
																													itemModifier.displayText
																												}
																											</Option>
																										);
																									},
																								)}
																							</Select>
																						</Form.Item>
																						<Form.Item
																							name={[
																								indexChild,
																								'managerPermission',
																							]}
																							className="w-[150px]"
																							initialValue={
																								defaultManager
																							}
																						>
																							<Select
																								className="w-full"
																								defaultValue={
																									defaultManager
																								}
																								disabled={valueChecked}
																							>
																								{managerConfig.map(
																									(
																										itemManger: any,
																										indexManager: number,
																									) => {
																										return (
																											<Option
																												key={
																													indexManager
																												}
																												value={JSON.stringify(
																													itemManger,
																												)}
																											>
																												{
																													itemManger.displayText
																												}
																											</Option>
																										);
																									},
																								)}
																							</Select>
																						</Form.Item>
																					</Space>
																				</div>
																			);
																		},
																	)}
																</>
															)}
														</Form.List>
													</Form.Item>
												</>
											);
										})}
									</>
								)}
							</Form.List>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}
