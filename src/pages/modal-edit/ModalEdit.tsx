import './ModalEdit';
import { Button, Input, Select, Pagination, Modal, Form, message } from 'antd';
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
import { useNavigate } from 'react-router-dom';
import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { MessageConstantError, MessageConstantSuccess } from '../../constant/auth/auth.constant';

export default function ModalEdit(props: any) {
	const navigate = useNavigate();
	const [formModalEdit] = Form.useForm();
	const { isModalVisibleEdit, handleCancelEdit, userName, userNameHyberLink } = props;
	const [dataUserAll, setDataUserAll] = useState([]);

	const onFinish = (values: any) => {
		const numberStaffEdit = values.staffEdit;
		const data = dataUserAll
			.filter((item: any) => {
				return item.status.displayText === 'Đang hoạt động';
			})
			.map((item: any, index: number) => {
				if (item.employee!) {
					return item;
				}
			});

		const IDEdit = data.find((item, index) => {
			if (numberStaffEdit == index) {
				return item;
			}
		}).id;

		const employeeIDEdit = data.find((item, index) => {
			if (numberStaffEdit == index) {
				return item;
			}
		}).employee.id;
		const userGroupIDEdit = data.find((item, index) => {
			if (numberStaffEdit == index) {
				return item;
			}
		}).userGroup.id;

		const params = {
			id: IDEdit,
			email: values.email,
			employeeId: employeeIDEdit,
			userGroupId: userGroupIDEdit,
		};
		updateUser(params)
			.then(res => {
				console.log(res);
				message.success(MessageConstantSuccess.updateUserSuccess);
				navigate('/home');
			})
			.catch(err => {
				console.log(err);
				message.error(MessageConstantError.updateUserUnsuccess);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const arrayValue = dataUserAll.map((item: any, index) => {
		return item.userGroup.name;
	});

	if (!isModalVisibleEdit) {
		formModalEdit.setFieldsValue({
			staffEdit: '',
			usernameEdit: '',
			userName: '',
			email: '',
			action: '',
		});
	}
	useEffect(() => {
		getAllUser()
			.then(res => {
				console.log(res);
				setDataUserAll(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<Modal
			visible={isModalVisibleEdit}
			//  onOk={handleOk}
			onCancel={handleCancelEdit}
			footer={null}
			centered
		>
			<h1>CẬP NHẬT TÀI KHOẢN NGƯỜI DÙNG</h1>
			<Form
				form={formModalEdit}
				name="formModalEdit"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label={<label className="font-semibold text-base">Nhân viên</label>}
					name="staffEdit"
					rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
				>
					<Select>
						{dataUserAll
							.filter((item: any) => {
								return item.status.displayText === 'Đang hoạt động';
							})
							.map((item: any, index: number) => {
								if (item.employee!) {
									return (
										<Option key={index}>
											{item?.employee?.no}-{item?.employee?.name}
										</Option>
									);
								}
							})}
					</Select>
				</Form.Item>

				<Form.Item label={<label className="font-semibold text-base">Tên đăng nhập</label>} name="usernameEdit">
					<Input placeholder={userName || userNameHyberLink} disabled />
				</Form.Item>
				<Form.Item
					label={<label className="font-semibold text-base">Email</label>}
					name="email"
					rules={[
						{
							validator(rule, value) {
								const checkEmail = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
								if (value == '' || value == undefined || value == null) {
									return Promise.reject(new Error('Vui lòng nhập email!'));
								} else if (!checkEmail.test(value)) {
									return Promise.reject(new Error('Email sai định dạng vui lòng kiểm tra lại!'));
								} else {
									return Promise.resolve();
								}
							},
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={<label className="font-semibold text-base">Vai trò của người dùng</label>}
					name="action"
					rules={[{ required: true, message: 'Chọn vai trò của người dùng!' }]}
				>
					<Select>
						{arrayValue
							.filter((item: any, index: any) => {
								return arrayValue.indexOf(item) === index;
							})
							.map((item, index) => {
								return <Option key={index}>{item}</Option>;
							})}
					</Select>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button
						danger
						type="primary"
						htmlType="submit"
						onClick={handleCancelEdit}
						style={{ marginRight: '10px', marginTop: '20px' }}
					>
						Hủy thao tác
					</Button>
					<Button type="primary" htmlType="submit">
						Lưu thông tin
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
