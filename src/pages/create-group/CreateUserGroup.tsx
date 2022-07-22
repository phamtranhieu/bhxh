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
	console.log(dataUserGroup);
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

	const defaultValueData = dataConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const defaultCreate = createConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const defaultValueCreate = createConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const defaultModifier = modifierConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const defaultValueModifier = modifierConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const defaultManager = managerConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.display;

	const defaultValueManager = managerConfig.map((item: ItemConfig) => {
		return { display: item.displayText, value: item.value };
	})[1]?.value;

	const handleChecked = (e: any) => {
		setValueChecked(e.target.checked);
	};
	console.log(dataConfig);

	const handleChange = (indexDadGet: string, indexChildGet: string) => {
		console.log(indexDadGet);
		console.log(indexChildGet);

		// if () {

		// }
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
					<div className="mt-5 flex w-full">
						<div className="w-full">
							<Form.List name="groupDataUsers">
								{(fields, { add, remove }) => (
									<>
										{dataUserGroup.map((itemDad: any, indexDad) => {
											return (
												<Form.Item>
													<h1>{itemDad.description}</h1>
													<Form.List name={[indexDad, 'dataUsers']}>
														{(fields, { add, remove }) => (
															<>
																{itemDad.features.map(
																	(item: any, indexChild: number) => {
																		return (
																			<div className="flex">
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
																					<Form.Item
																						name={[
																							indexChild,
																							'dataPermission',
																						]}
																						className="w-[150px]"
																						initialValue={defaultValueData}
																					>
																						<Select
																							className="w-full"
																							defaultValue={
																								defaultValueData
																							}
																							// placeholder={defaultData}
																							onChange={() => {
																								handleChange(
																									itemDad.id,
																									item.id,
																								);
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
																											value={
																												itemData.value
																											}
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
																						initialValue={
																							defaultValueCreate
																						}
																					>
																						<Select
																							className="w-full"
																							defaultValue={
																								defaultValueCreate
																							}
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
																											value={
																												itemCreate.value
																											}
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
																							defaultValueModifier
																						}
																					>
																						<Select
																							className="w-full"
																							defaultValue={
																								defaultValueModifier
																							}
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
																											value={
																												itemModifier.value
																											}
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
																							defaultValueManager
																						}
																					>
																						<Select
																							className="w-full"
																							defaultValue={
																								defaultValueManager
																							}
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
																											value={
																												itemManger.value
																											}
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
