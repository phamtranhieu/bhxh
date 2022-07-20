import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Checkbox, Select, Space } from 'antd';
import {
	getAllFunctionGroupUser,
	getCreateConfigGroup,
	getManagerConfigGroup,
	getModifierConfigGroup,
	getDataConfigGroup,
} from '../../service/group/GroupUserService';
import { DisabledContextProvider } from 'antd/lib/config-provider/DisabledContext';
import { GroupItemType, ItemChildType, ItemConfig } from '../../interface/group/UserGroupType';
import { titleFunction } from '../../service/group/DataUserService';
import { EditOutlined, MinusCircleOutlined, PlusOutlined, DislikeOutlined } from '@ant-design/icons';

export default function CreateUserGroup() {
	const { Option } = Select;
	const [dataUserGroup, setDataUserGroup] = useState([]);
	const [dataConfig, setDataConfig] = useState([]);
	const [createConfig, setCreateConfig] = useState([]);
	const [modifierConfig, setModifierConfig] = useState([]);
	const [managerConfig, setManagerConfig] = useState([]);
	const [valueChecked, setValueChecked] = useState<boolean>(false);

	const [dataPermiss, setDataPermiss] = useState({});

	useEffect(() => {
		getAllFunctionGroupUser()
			.then(res => {
				console.log(res);
				setDataUserGroup(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getDataConfigGroup()
			.then(res => {
				console.log(res);
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
	}, []);

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const defaultData = dataConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const defaultCreate = createConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const defaultModifier = modifierConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const defaultManager = managerConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const handleChecked = (e: any) => {
		setValueChecked(e.target.checked);
	};

	return (
		<div>
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 32 }}
				name="dynamic_form_nest_item"
				onFinish={onFinish}
				autoComplete="off"
				initialValues={{ dataUsers: [''] }}
			>
				<div className="flex justify-between mb-5">
					<h1>TẠO MỚI VAI TRÒ CỦA NGƯỜI DÙNG</h1>
					<div>
						<Button>Hủy thao tác</Button>
						<Button className="ml-5" type="primary" htmlType="submit">
							Lưu thông tin
						</Button>
					</div>
				</div>
				<div>
					<Form.Item
						label={<label>Vai trò người dùng (*)</label>}
						name="username"
						rules={[{ required: true, message: 'Vui lòng nhập vai trò của người dùng' }]}
					>
						<Input className="w-[200px]" />
					</Form.Item>

					<Form.Item name="remember" valuePropName="" wrapperCol={{ offset: 8, span: 16 }}>
						<Checkbox onChange={handleChecked}>Thuộc nhóm toàn quyền quản lý hệ thống</Checkbox>
					</Form.Item>

					<p>Phân quyền chi tiết (*)</p>

					<div className="flex justify-between border-b-2 border-b-border-gray">
						{titleFunction.map((item, index) => {
							return <p>{item.title}</p>;
						})}
					</div>
					<div className="mt-5">
						{dataUserGroup.map((item: GroupItemType, index: number) => {
							return (
								<div key={index}>
									<h1 className="mb-5">{item.description}</h1>
									{item.features.map((itemChild: ItemChildType, indexChild: number) => {
										console.log(itemChild);
										return (
											<div className="flex items-center " key={indexChild}>
												<div>
													<p className="mb-5 ml-5 w-[150px]">{itemChild.description}</p>
												</div>
												<Form.List name="dataUsers">
													{(fields, { add, remove }) => (
														<>
															{fields.map(({ key, name, ...restField }) => (
																<Space
																	key={indexChild}
																	style={{
																		display: 'flex',
																		marginBottom: 8,
																		marginLeft: '150px',
																	}}
																	align="baseline"
																	className="flex justify-between w-full "
																>
																	<Form.Item
																		{...restField}
																		name={[name, 'dataPermission']}
																		rules={[
																			{
																				required: true,
																				message: 'Missing first name',
																			},
																		]}
																		className="w-[150px]"
																	>
																		<Select
																			className="w-full"
																			defaultValue={defaultData}
																			disabled={valueChecked}
																		>
																			{dataConfig.map(
																				(item: ItemConfig, index) => {
																					return (
																						<Option key={index}>
																							{item.displayText}
																						</Option>
																					);
																				},
																			)}
																		</Select>
																	</Form.Item>
																	<Form.Item
																		{...restField}
																		name={[name, 'createPermission']}
																		rules={[
																			{
																				required: true,
																				message: 'Missing last name',
																			},
																		]}
																		className="w-[150px]"
																	>
																		<Select
																			className="w-[150px]"
																			defaultValue={defaultData}
																			disabled={valueChecked}
																		>
																			{dataConfig.map(
																				(item: ItemConfig, index) => {
																					return (
																						<Option key={index}>
																							{item.displayText}
																						</Option>
																					);
																				},
																			)}
																		</Select>
																	</Form.Item>
																	<Form.Item
																		{...restField}
																		name={[name, 'modifierPermission']}
																		rules={[
																			{
																				required: true,
																				message: 'Missing last name',
																			},
																		]}
																		className="w-[150px]"
																	>
																		<Select
																			className="w-[150px]"
																			defaultValue={defaultData}
																			disabled={valueChecked}
																		>
																			{dataConfig.map(
																				(item: ItemConfig, index) => {
																					return (
																						<Option key={index}>
																							{item.displayText}
																						</Option>
																					);
																				},
																			)}
																		</Select>
																	</Form.Item>
																	<Form.Item
																		{...restField}
																		name={[name, 'managerPermission']}
																		rules={[
																			{
																				required: true,
																				message: 'Missing last name',
																			},
																		]}
																		className="w-[150px]"
																	>
																		<Select
																			className="w-[150px]"
																			defaultValue={defaultData}
																			disabled={valueChecked}
																		>
																			{dataConfig.map(
																				(item: ItemConfig, index) => {
																					return (
																						<Option key={index}>
																							{item.displayText}
																						</Option>
																					);
																				},
																			)}
																		</Select>
																	</Form.Item>
																</Space>
															))}
														</>
													)}
												</Form.List>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</Form>
		</div>
	);
}
