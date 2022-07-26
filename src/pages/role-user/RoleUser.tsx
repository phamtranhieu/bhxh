import { Space, Tag, Input, Button, Table, Pagination, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, useRef } from 'react';
import type { PaginationProps } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
	createGroupUser,
	deleteGroupUser,
	getAllGroupUser,
	paginationGroupUser,
	updateGroupUser,
} from '../../service/group/GroupUserService';
import {
	EditOutlined,
	KeyOutlined,
	LikeOutlined,
	DislikeOutlined,
	EyeOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
interface DataType {
	key: number;
	roleUser: any;
	numberUser: any;
	action: any;
	idUser: string;
}

export default function RoleUser() {
	const [pageNumberRole, setPageNumber] = useState<number>(0);
	const [pageSizeRole, setPageSize] = useState<number>(6);
	const [dataGroupUser, setDataGroupUser] = useState([]);
	const typingTimeoutRef = useRef(null);
	const [filterSearch, setFilterSearch] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [objParams, setObjParams] = useState({});

	const navigate = useNavigate();
	useEffect(() => {
		paginationGroupUser(pageNumberRole, pageSizeRole, objParams)
			.then(res => {
				console.log(res);
				setDataGroupUser(res.data.data.items);
			})
			.catch(err => {
				console.log(err);
			});
	}, [pageNumberRole, pageSizeRole, objParams]);

	const dataShow: DataType[] = dataGroupUser.map((item: any, index: number) => {
		return {
			key: index + 1,
			roleUser: item.name,
			numberUser: item.userNumber + ' người dùng',
			action: '',
			idUser: item.id,
		};
	});

	const columns: ColumnsType<DataType> = [
		{
			title: 'STT',
			dataIndex: 'key',
			key: 'key',
		},
		{
			title: 'Vai trò của người dùng',
			dataIndex: 'roleUser',
			key: 'roleUser',
			render: (_, record) => (
				<div
					onClick={() => {
						console.log(record);
					}}
					className="text-[blue]"
				>
					{record.roleUser}
				</div>
			),
		},
		{
			title: 'Số lượng của người dùng',
			dataIndex: 'numberUser',
			key: 'numberUser',
		},
		{
			title: 'Thao tác',
			key: 'action',
			dataIndex: 'action',
			render: (_, record) => (
				<div className="flex">
					<EyeOutlined
						className="mr-5"
						onClick={() => {
							console.log(record);
							navigate(`/home/detail-group-user?id=${record.idUser}`);
						}}
					/>
					<DeleteOutlined />
				</div>
			),
		},
	];

	const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
		setPageNumber(pageNumber);
		setPageSize(pageSize);
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
			pageNumber: `${pageNumberRole + 1}`,
			pageSize: `${pageSizeRole}`,
			searchKey: e.target.value,
		});
		setObjParams({
			...objParams,
			searchKey: e.target.value,
		});
	};
	const handleAdd = () => {
		navigate('/home/create-group-user');
	};
	return (
		<div>
			<div className="flex justify-between">
				<Form.Item name="search" className="w-96">
					<Input placeholder="Tìm theo vai trò của người dùng" onChange={handleChange} />
				</Form.Item>
				<Button onClick={handleAdd}>Thêm mới</Button>
			</div>
			<div>
				<Table columns={columns} dataSource={dataShow} pagination={false} />
			</div>
			<div className="flex justify-end mt-5">
				<Pagination
					defaultCurrent={1}
					total={dataGroupUser.length}
					showSizeChanger
					onChange={onChange}
					defaultPageSize={6}
				/>
			</div>
		</div>
	);
}
