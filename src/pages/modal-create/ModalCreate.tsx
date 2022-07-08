import './ModalCreate';
import { Button, Input, Select, Pagination, Modal, Form } from 'antd';
const { Option } = Select;
import type { PaginationProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import {
	statusStaff,
	creatStaff,
	deleteStaff,
	inforStaff,
	inforStaffAll,
	inforStaffPagination,
	updateStaff,
} from '../../service/staff/StaffService';

import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

export default function ModalCreate() {
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
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Modal
			visible={isModalVisible}
			//  onOk={handleOk}
			//  onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Hủy thao tác
				</Button>,
				<Button key="submit" type="primary" onClick={handleOk}>
					Lưu thông tin
				</Button>,
			]}
		>
			<h1>TẠO MỚI TÀI KHOẢN NGƯỜI DÙNG</h1>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label={<label className="font-semibold text-[16px]">Nhân viên</label>}
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={<label className="font-semibold text-[16px]">Tên đăng nhập</label>}
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={<label className="font-semibold text-[16px]">Email</label>}
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={<label className="font-semibold text-[16px]">Mật khẩu</label>}
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={<label className="font-semibold text-[16px]">Nhập lại mật khẩu</label>}
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={<label className="font-semibold text-[16px]">Vai trò của người dùng</label>}
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input />
				</Form.Item>

				{/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item> */}
			</Form>
		</Modal>
	);
}
