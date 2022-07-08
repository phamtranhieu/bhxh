import './ControlUser.scss';
import { Button, Input, Select, Pagination, Modal, Form } from 'antd';
const { Option } = Select;
import type { PaginationProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import {
	changeActivityUser,
	creatUser,
	deleteUser,
	getAllUser,
	inforUser,
	inforUserPagination,
	resetPasssUser,
	updateUser,
} from '../../service/user/UserService';

import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import ModalCreate from '../modal-create/ModalCreate';

const statusStaffContent = [
	{ status: 'Đang hoạt động', id: 1 },
	{ status: 'Đã vô hiệu hóa', id: 2 },
];

interface DataType {
	key: string;
	name: string;
	staff: string;
	email: string;
	job: string;
	active: boolean;
	action: any;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'STT',
		dataIndex: 'key',
		key: 'key',
		// render: text => <a>{text}</a>,
	},
	{
		title: 'Tên đăng nhập',
		dataIndex: 'name',
		key: 'name',
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
		// render: (_, { tags }) => (
		// 	<>
		// 		{tags.map(tag => {
		// 			let color = tag.length > 5 ? 'geekblue' : 'green';
		// 			if (tag === 'loser') {
		// 				color = 'volcano';
		// 			}
		// 			return (
		// 				<Tag color={color} key={tag}>
		// 					{tag.toUpperCase()}
		// 				</Tag>
		// 			);
		// 		})}
		// 	</>
		// ),
	},
	{
		title: 'Vai trò người dùng',
		key: 'job',
		dataIndex: 'job',
		// render: (_, record) => (
		// 	<Space size="middle">
		// 		<a>Invite {record.name}</a>
		// 		<a>Delete</a>
		// 	</Space>
		// ),
	},
	{
		title: 'Trạng thái',
		key: 'active',
		dataIndex: 'active',
		// render: (_, record) => (
		// 	<Space size="middle">
		// 		<a>Invite {record.name}</a>
		// 		<a>Delete</a>
		// 	</Space>
		// ),
	},
	{
		title: 'Thao tác',
		key: 'action',
		dataIndex: 'action',
		render: (_, record) => (
			<Space size="middle">
				{/* <a>Invite {record.name}</a> */}
				<EditOutlined />
				<KeyOutlined />
			</Space>
		),
	},
];

export default function ControlStaff() {
	const [numberPage, setNumberPage] = useState<number>(0);
	const [sizePage, setSizePage] = useState<number>(6);
	const [dataStaff, setDataStaff] = useState<any>([]);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const data: DataType[] = dataStaff.map((item: any, index: number) => {
		return {
			key: index + 1,
			name: item.username,
			staff: item?.employee?.name || 'N/A',
			email: item.email ? item.email : 'null',
			job: item.userGroup.name,
			active: item.status.value == 'Active' ? <LikeOutlined /> : <DislikeOutlined />,
			action: '',
		};
	});

	useEffect(() => {
		inforUserPagination(numberPage, sizePage)
			.then(res => {
				console.log(res);
				setDataStaff(res.data.data.items);
			})
			.catch(err => {
				console.log(err);
			});
	}, [numberPage, sizePage]);

	const onChange: PaginationProps['onChange'] = (page, size) => {
		console.log(page);
		console.log(size);
		setNumberPage(page - 1);
		setSizePage(size);
	};

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<>
			<div>
				<div>
					<div className="flex justify-between">
						<div>
							<Input />
						</div>
						<Button onClick={showModal}>Thêm mới</Button>
					</div>
					<div className="flex">
						<div className="mr-5">
							<p>Trạng thái</p>
							<Select defaultValue={'Tất cả'} className="w-[150px]">
								{statusStaffContent.map((item, index) => {
									return <Option key={index}>{item.status}</Option>;
								})}
							</Select>
						</div>
						<div>
							<p>Vai trò của người dùng</p>
							<Select defaultValue={'Tất cả'} className="w-[150px]">
								{statusStaffContent.map((item, index) => {
									return <Option key={index}>{item.status}</Option>;
								})}
							</Select>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<Table columns={columns} dataSource={data} pagination={false} />
				</div>
				<div>
					<Pagination
						showSizeChanger
						onChange={onChange}
						// onShowSizeChange={onShowSizeChange}
						defaultCurrent={1}
						total={500}
						defaultPageSize={6}
						style={{ display: 'flex', justifyContent: 'end' }}
					/>
				</div>
			</div>
			<ModalCreate isModalVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk} />
		</>
	);
}
