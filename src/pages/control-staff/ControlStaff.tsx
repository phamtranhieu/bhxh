import './ControlStaff.scss';
import { Button, Input, Select } from 'antd';
const { Option } = Select;
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';

const statusStaff = [
	{ status: 'Đang hoạt động', id: 1 },
	{ status: 'Đã vô hiệu hóa', id: 2 },
];

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

useEffect(() => {});

const columns: ColumnsType<DataType> = [
	{
		title: 'STT',
		dataIndex: 'stt',
		key: 'stt',
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
		key: 'action',
		// render: (_, record) => (
		// 	<Space size="middle">
		// 		<a>Invite {record.name}</a>
		// 		<a>Delete</a>
		// 	</Space>
		// ),
	},
	{
		title: 'Trạng thái',
		key: 'action',
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
		// render: (_, record) => (
		// 	<Space size="middle">
		// 		<a>Invite {record.name}</a>
		// 		<a>Delete</a>
		// 	</Space>
		// ),
	},
];

const data: DataType[] = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];

export default function ControlStaff() {
	return (
		<div>
			<div>
				<div className="flex justify-between">
					<div>
						<Input />
					</div>
					<Button>Thêm mới</Button>
				</div>
				<div className="flex">
					<div className="mr-5">
						<p>Trạng thái</p>
						<Select defaultValue={'Tất cả'} className="w-[150px]">
							{statusStaff.map((item, index) => {
								return <Option key={index}>{item.status}</Option>;
							})}
						</Select>
					</div>
					<div>
						<p>Vai trò của người dùng</p>
						<Select defaultValue={'Tất cả'} className="w-[150px]">
							{statusStaff.map((item, index) => {
								return <Option key={index}>{item.status}</Option>;
							})}
						</Select>
					</div>
				</div>
			</div>
			<div>
				<Table columns={columns} dataSource={data} />;
			</div>
		</div>
	);
}
