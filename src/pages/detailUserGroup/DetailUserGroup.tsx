import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Checkbox, Select, Space, message } from 'antd';
import {
	getAllFunctionGroupUser,
	getCreateConfigGroup,
	getManagerConfigGroup,
	getModifierConfigGroup,
	getDataConfigGroup,
	createGroupUser,
} from '../../service/group/GroupUserService';
import { GroupItemType, ItemChildType, ItemConfig } from '../../interface/group/UserGroupType';
import { titleFunction } from '../../service/group/DataUserService';

export default function DetailUserGroup() {
	const { Option } = Select;
	const [formUpdate] = Form.useForm();
	const [dataUserGroup, setDataUserGroup] = useState([]);
	const [dataConfig, setDataConfig] = useState([]);
	const [createConfig, setCreateConfig] = useState([]);
	const [modifierConfig, setModifierConfig] = useState([]);
	const [managerConfig, setManagerConfig] = useState([]);
	const [valueChecked, setValueChecked] = useState<boolean>(false);

	const handleChecked = (e: any) => {
		setValueChecked(e.target.checked);
	};
	const onFinish = (values: any) => {
		console.log(values);
	};
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
	return (
		<div>
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 32 }}
				name="dynamic_form_nest_item"
				onFinish={onFinish}
				autoComplete="off"
				initialValues={{ modules: [''], features: [''] }}
				form={formUpdate}
			>
				<div className="flex justify-between mb-5">
					<h1>CHI TIẾT VAI TRÒ CỦA NGƯỜI DÙNG</h1>
					<div>
						<Button
						// onClick={handleDelete}
						>
							Trở về
						</Button>
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
										{dataUserGroup.map((itemDad: any, indexDad) => {
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
