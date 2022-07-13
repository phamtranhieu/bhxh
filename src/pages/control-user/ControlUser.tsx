import './ControlUser.scss';
import { Button, Input, Select, Pagination, Modal, Form, Switch } from 'antd';
const { Option } = Select;
import type { PaginationProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState, useRef } from 'react';
import {
	changeActivityUser,
	creatUser,
	deleteUser,
	getAllUser,
	inforUser,
	inforUserPagination,
	resetPasssUser,
	updateUser,
	getListTextGroup,
	getListFunctionUser,
} from '../../service/user/UserService';

import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import ModalCreate from '../modal-create/ModalCreate';
import ModalEdit from '../modal-edit/ModalEdit';
import ModalReset from '../modal-reset/ModalReset';
import ModalConfirm from '../modal-confirm/ModalConfirm';

interface DataType {
	key: string;
	name: string;
	staff: string;
	email: string;
	job: string;
	active: boolean;
	action: any;
}

export default function ControlStaff() {
	const [sortActive, setSortActive] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [userName, setUserName] = useState('');
	const [numberPage, setNumberPage] = useState<number>(0);
	const [sizePage, setSizePage] = useState<number>(6);
	const [dataUser, setDataUser] = useState<any>([]);
	const [idUserUse, setIdUserUse] = useState('');
	const [idUserUseConfirm, setIdUserUseConfirm] = useState('');
	const [filterSearch, setFilterSearch] = useState<string>('');
	const typingTimeoutRef = useRef(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [statusUser, setStatusUser] = useState('');
	const [valueGroup, setValueGroup] = useState<any>([]);
	const [functionUserGroup, setFunctionUserGroup] = useState<any>([]);
	const [groupUserID, setGroupUserID] = useState('');
	const [userNameHyberLink, setUserNameHyberLink] = useState('');
	const [lengthArrayAllUser, setLengthArrayAllUser] = useState<number>(0);

	useEffect(() => {
		const params = 'UserStatus';
		getListTextGroup(params)
			.then(res => {
				console.log(res);
				setValueGroup(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getListFunctionUser()
			.then(res => {
				console.log(res);
				setFunctionUserGroup(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const statusStaffContent = valueGroup.map((item: any, index: number) => {
		return { status: item.displayText, value: item.value };
	});

	const functionUser = functionUserGroup.map((item: any, index: number) => {
		return { name: item.name, id: item.id };
	});
	const columns: ColumnsType<DataType> = [
		{
			title: 'STT',
			dataIndex: 'key',
			key: 'key',
		},
		{
			title: 'Tên đăng nhập',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => (
				<div
					onClick={() => {
						console.log(record);
						setUserNameHyberLink(record.name);
						setUserName('');
						showModalEdit();
					}}
					style={{ color: 'blue' }}
				>
					{record.name}
				</div>
			),
		},
		{
			title: 'Nhân viên',
			dataIndex: 'staff',
			key: 'staff',
		},
		{
			title: 'Email',
			key: 'email',
			dataIndex: 'email',
		},
		{
			title: 'Vai trò người dùng',
			key: 'job',
			dataIndex: 'job',
		},
		{
			title: 'Trạng thái',
			key: 'active',
			dataIndex: 'active',
		},
		{
			title: 'Thao tác',
			key: 'action',
			dataIndex: 'action',
			render: (_, record) => (
				<Space size="middle">
					<EditOutlined
						onClick={() => {
							handleClickEdit(record);
						}}
					/>
					<KeyOutlined
						onClick={() => {
							handleClickReset(record);
						}}
					/>
				</Space>
			),
		},
	];

	useEffect(() => {
		getAllUser()
			.then(res => {
				console.log(res);
				setLengthArrayAllUser(res.data.data.length);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const handleClickReset = (params: any) => {
		showModalReset();
		const idUser = dataUser.find((item: any, index: number) => {
			if (index == params.key - 1) {
				return item;
			}
		}).id;
		setIdUserUse(idUser);
	};

	const handleClickEdit = (params: any) => {
		setUserName(params.name);
		showModalEdit();
	};

	// modal create

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	// modal edit

	const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

	const showModalEdit = () => {
		setIsModalVisibleEdit(true);
	};

	const handleOkEdit = () => {
		setIsModalVisibleEdit(false);
	};

	const handleCancelEdit = () => {
		setIsModalVisibleEdit(false);
	};

	// modal reset
	const [isModalVisibleReset, setIsModalVisibleReset] = useState(false);
	const showModalReset = () => {
		setIsModalVisibleReset(true);
	};

	const handleOkReset = () => {
		setIsModalVisibleReset(false);
	};

	const handleCancelReset = () => {
		setIsModalVisibleReset(false);
	};
	// modal confirm status
	const [isModalVisibleConfirm, setIsModalVisibleConfirm] = useState(false);
	const showModalConfirm = () => {
		setIsModalVisibleConfirm(true);
	};

	const handleOkConfirm = () => {
		setIsModalVisibleConfirm(false);
	};

	const handleCancelConfirm = () => {
		setIsModalVisibleConfirm(false);
	};

	const handleConfirm = (params: any, idparams: any) => {
		setStatusUser(params);
		showModalConfirm();
		setIdUserUseConfirm(idparams);
	};

	const data: DataType[] = dataUser.map((item: any, index: number) => {
		return {
			key: index + 1,
			name: item.username,
			staff: item?.employee?.name || 'N/A',
			email: item.email ? item.email : 'null',
			job: item.userGroup.name,
			active: (
				<Switch
					checked={item.status.value == 'Active' ? true : false}
					onClick={() => {
						handleConfirm(item.status.value, item.id);
					}}
				/>
			),
			action: '',
		};
	});

	useEffect(() => {
		inforUserPagination(numberPage, sizePage, filterSearch, sortActive, groupUserID)
			.then(res => {
				console.log(res);
				setDataUser(res.data.data.items);
			})
			.catch(err => {
				console.log(err);
			});
	}, [numberPage, sizePage, filterSearch, sortActive, groupUserID]);

	const onChange: PaginationProps['onChange'] = (page, size) => {
		setNumberPage(page - 1);
		setSizePage(size);
		setSearchParams({
			...searchParams,
			pageNumber: `${page}`,
			pageSize: `${size}`,
			searchKey: filterSearch,
			status: sortActive,
		});
	};

	const handleChange = (e: any) => {
		console.log(e.target.value);
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		} else {
			setTimeout(() => {
				setFilterSearch(e.target.value);
			}, 300);
		}
		setSearchParams({
			...searchParams,
			pageNumber: `${numberPage + 1}`,
			pageSize: `${sizePage}`,
			searchKey: e.target.value,
			status: sortActive,
		});
	};
	const handleChangeStatus = (e: any) => {
		const valueStatus = statusStaffContent.find((item: any, index: any) => {
			console.log(item);
			if (index == e) {
				return item;
			}
		})?.value;

		if (valueStatus != undefined) {
			setSortActive(valueStatus);
		}
		setSearchParams({
			...searchParams,
			pageNumber: `${numberPage + 1}`,
			pageSize: `${sizePage}`,
			searchKey: e.target?.value,
			status: sortActive,
		});
	};
	const handleChangeFunctionUser = (e: any) => {
		functionUser.map((item: any, index: number) => {
			if (e == index) {
				console.log(item);
				setGroupUserID(item.id);
			}
		});
	};
	console.log(lengthArrayAllUser);
	console.log(sizePage);

	console.log(Math.floor(lengthArrayAllUser / sizePage) + 1);
	return (
		<>
			<div>
				<div>
					<Form name="basic" initialValues={{ remember: true }} autoComplete="off">
						<div className="flex justify-between">
							<Form.Item name="search">
								<Input placeholder="tìm kiếm" style={{ width: '400px' }} onChange={handleChange} />
							</Form.Item>
							<Button onClick={showModal}>Thêm mới</Button>
						</div>
						<div className="flex">
							<div className="mr-5">
								<p>Trạng thái</p>
								<Form.Item
									name="status"
									rules={[{ required: true, message: 'Please input your username!' }]}
									initialValue="Tất cả"
								>
									<Select
										style={{ width: '150px' }}
										className="w-[150px]"
										onChange={e => {
											handleChangeStatus(e);
										}}
									>
										{statusStaffContent.map((item: any, index: number) => {
											return <Option key={index}>{item.status}</Option>;
										})}
									</Select>
								</Form.Item>
							</div>
							<div>
								<p>Vai trò của người dùng</p>
								<Select
									defaultValue={'Tất cả'}
									className="w-[150px]"
									onChange={e => {
										handleChangeFunctionUser(e);
									}}
								>
									{functionUser.map((item: any, index: number) => {
										return <Option key={index}>{item.name}</Option>;
									})}
								</Select>
							</div>
						</div>
					</Form>
				</div>
				<div className="mb-5">
					<Table columns={columns} dataSource={data} pagination={false} />
				</div>
				<div>
					<Pagination
						showSizeChanger
						onChange={onChange}
						defaultCurrent={1}
						total={lengthArrayAllUser}
						defaultPageSize={6}
						style={{ display: 'flex', justifyContent: 'end' }}
					/>
				</div>
			</div>
			<ModalCreate isModalVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} />
			<ModalEdit
				isModalVisibleEdit={isModalVisibleEdit}
				handleCancelEdit={handleCancelEdit}
				handleOkEdit={handleOkEdit}
				userName={userName}
				userNameHyberLink={userNameHyberLink}
			/>
			<ModalReset
				isModalVisibleReset={isModalVisibleReset}
				setIsModalVisibleReset={setIsModalVisibleReset}
				handleCancelReset={handleCancelReset}
				handleOkReset={handleOkReset}
				idUserUse={idUserUse}
			/>
			<ModalConfirm
				isModalVisibleConfirm={isModalVisibleConfirm}
				handleCancelConfirm={handleCancelConfirm}
				handleOkConfirm={handleOkConfirm}
				statusUser={statusUser}
				idUserUseConfirm={idUserUseConfirm}
			/>
		</>
	);
}
