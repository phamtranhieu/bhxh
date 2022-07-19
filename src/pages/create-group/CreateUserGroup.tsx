import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Checkbox, Select } from 'antd';
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

	const handleChangeData = (indexChild: number, indexSearch: number, e: any) => {
		const itemCatalog: any = dataUserGroup.find((item: GroupItemType, index: number) => {
			return indexSearch == index;
		});
		console.log(itemCatalog.id);
		const idItemChildCatalog = itemCatalog.features.find((item: any, index: any) => {
			if (indexChild == index) {
				return item;
			}
		});
		const inforItemCatalog: any = dataConfig?.find((item: ItemConfig, index: number) => {
			if (e == index) {
				return item;
			}
		});
		console.log(inforItemCatalog);
		console.log(idItemChildCatalog.id);
		const objDataPermiss = {
			key: inforItemCatalog.key,
			value: inforItemCatalog.value,
			displayText: inforItemCatalog.displayText,
			group: inforItemCatalog.group,
			order: inforItemCatalog.order,
		};
	};

	const handleChangeCreate = (indexChild: number, indexSearch: number, e: any) => {
		const itemCatalog: any = dataUserGroup.find((item: GroupItemType, index: number) => {
			return indexSearch == index;
		});
		console.log(itemCatalog.id);
		const idItemChildCatalog = itemCatalog.features.find((item: any, index: any) => {
			if (indexChild == index) {
				return item;
			}
		});
		const inforItemCatalog: any = createConfig?.find((item: ItemConfig, index: number) => {
			if (e == index) {
				return item;
			}
		});
		console.log(inforItemCatalog);
		console.log(idItemChildCatalog.id);
		const objCreatePermiss = {
			key: inforItemCatalog.key,
			value: inforItemCatalog.value,
			displayText: inforItemCatalog.displayText,
			group: inforItemCatalog.group,
			order: inforItemCatalog.order,
		};
	};
	const handleChangeManager = (indexChild: number, indexSearch: number, e: any) => {
		const itemCatalog: any = dataUserGroup.find((item: GroupItemType, index: number) => {
			return indexSearch == index;
		});
		console.log(itemCatalog.id);
		const idItemChildCatalog = itemCatalog.features.find((item: any, index: any) => {
			if (indexChild == index) {
				return item;
			}
		});
		const inforItemCatalog: any = createConfig?.find((item: ItemConfig, index: number) => {
			if (e == index) {
				return item;
			}
		});
		console.log(inforItemCatalog);
		console.log(idItemChildCatalog.id);
		const objManagerPermiss = {
			key: inforItemCatalog.key,
			value: inforItemCatalog.value,
			displayText: inforItemCatalog.displayText,
			group: inforItemCatalog.group,
			order: inforItemCatalog.order,
		};
	};
	const handleChangeModifier = (indexChild: number, indexSearch: number, e: any) => {
		const itemCatalog: any = dataUserGroup.find((item: GroupItemType, index: number) => {
			return indexSearch == index;
		});
		console.log(itemCatalog.id);
		const idItemChildCatalog = itemCatalog.features.find((item: any, index: any) => {
			if (indexChild == index) {
				return item;
			}
		});
		const inforItemCatalog: any = createConfig?.find((item: ItemConfig, index: number) => {
			if (e == index) {
				return item;
			}
		});
		console.log(inforItemCatalog);
		console.log(idItemChildCatalog.id);
		const objModifierPermiss = {
			key: inforItemCatalog.key,
			value: inforItemCatalog.value,
			displayText: inforItemCatalog.displayText,
			group: inforItemCatalog.group,
			order: inforItemCatalog.order,
		};
	};

	return (
		<div>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 8 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
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
										return (
											<div className="flex justify-between items-center " key={indexChild}>
												<p className="mb-5 ml-5 w-[150px]">{itemChild.description}</p>
												<Select
													className="w-[150px]"
													defaultValue={defaultData}
													disabled={valueChecked}
													onChange={e => {
														handleChangeData(indexChild, index, e);
													}}
												>
													{dataConfig.map((item: ItemConfig, index) => {
														return <Option key={index}>{item.displayText}</Option>;
													})}
												</Select>
												<Select
													className="w-[150px]"
													defaultValue={defaultCreate}
													disabled={valueChecked}
													onChange={e => {
														handleChangeCreate(indexChild, index, e);
													}}
												>
													{createConfig.map((item: ItemConfig, index) => {
														return <Option key={index}>{item.displayText}</Option>;
													})}
												</Select>
												<Select
													className="w-[150px]"
													defaultValue={defaultModifier}
													disabled={valueChecked}
													onChange={e => {
														handleChangeModifier(indexChild, index, e);
													}}
												>
													{modifierConfig.map((item: ItemConfig, index) => {
														return <Option key={index}>{item.displayText}</Option>;
													})}
												</Select>
												<Select
													className="w-[150px]"
													defaultValue={defaultManager}
													disabled={valueChecked}
													onChange={e => {
														handleChangeManager(indexChild, index, e);
													}}
												>
													{managerConfig.map((item: ItemConfig, index) => {
														return <Option key={index}>{item.displayText}</Option>;
													})}
												</Select>
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
