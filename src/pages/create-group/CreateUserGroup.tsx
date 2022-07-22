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

	const onFinished = (values: any) => {
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
				initialValues={{ groupDataUsers: [''], dataUsers: [''] }}
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
					<div className="mt-5 flex">
						<div>
							<Form.List name="groupDataUsers">
								{(fields, { add, remove }) => (
									<>
										{dataUserGroup.map((itemDad: any, indexDad) => {
											return (
												<Form.Item name={[indexDad, 'id']}>
													<h1>{itemDad.description}</h1>
													<Form.List name="dataUsers">
														{(fields, { add, remove }) => (
															<>
																{itemDad.features.map(
																	(item: any, indexChild: number) => {
																		return (
																			<div className="flex">
																				<p>{item.description}</p>
																				<Space
																					// key={indexDad}
																					style={{
																						display: 'flex',
																						marginBottom: 8,
																					}}
																					align="baseline"
																				>
																					<Form.Item
																						// {...restField}
																						name={[indexChild, 'first']}
																						className="w-[150px]"
																						// rules={[{ required: true, message: 'Missing first name' }]}
																					>
																						<Select className="w-full">
																							<Option key="1" value="1">
																								1
																							</Option>
																							<Option key="2" value="2">
																								2
																							</Option>
																							<Option key="3" value="3">
																								3
																							</Option>
																						</Select>
																					</Form.Item>
																					<Form.Item
																						// {...restField}
																						name={[indexChild, 'last']}
																						className="w-[150px]"
																						// rules={[{ required: true, message: 'Missing last name' }]}
																					>
																						<Select className="w-full">
																							<Option key="1" value="1">
																								1
																							</Option>
																							<Option key="2" value="2">
																								2
																							</Option>
																							<Option key="3" value="3">
																								3
																							</Option>
																						</Select>
																					</Form.Item>
																					<Form.Item
																						// {...restField}
																						name={[indexChild, 'hieu']}
																						className="w-[150px]"
																						// rules={[{ required: true, message: 'Missing last name' }]}
																					>
																						<Select className="w-full">
																							<Option key="1" value="1">
																								1
																							</Option>
																							<Option key="2" value="2">
																								2
																							</Option>
																							<Option key="3" value="3">
																								3
																							</Option>
																						</Select>
																					</Form.Item>
																					<Form.Item
																						// {...restField}
																						name={[indexChild, 'nhu']}
																						className="w-[150px]"
																						// rules={[{ required: true, message: 'Missing last name' }]}
																					>
																						<Select className="w-[150px]">
																							<Option key="1" value="1">
																								1
																							</Option>
																							<Option key="2" value="2">
																								2
																							</Option>
																							<Option key="3" value="3">
																								3
																							</Option>
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
