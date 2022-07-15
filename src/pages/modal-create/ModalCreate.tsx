import './ModalCreate';
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
import { errorAuth } from '../../enum/auth/auth.error';
import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { MessageConstantError, MessageConstantSuccess } from '../../constant/auth/auth.constant';

export default function ModalCreate(props: any) {
	const navigate = useNavigate();
	const [formModalCreate] = Form.useForm();
	const { isModalVisible, handleCancel, handleOk } = props;
	const [dataUserAll, setDataUserAll] = useState([]);

	const onFinish = (values: any) => {
		const numberStaff = values.staff;
		const data = dataUserAll
			.filter((item: any) => {
				return item.status.displayText === 'Đang hoạt động';
			})
			.map((item: any, index: number) => {
				if (item.employee!) {
					return item;
				}
			});
		const employeeID = data.find((item, index) => {
			if (numberStaff == index) {
				return item;
			}
		}).employee.id;
		const userGroupID = data.find((item, index) => {
			if (numberStaff == index) {
				return item;
			}
		}).userGroup.id;

		const params = {
			username: values.username,
			password: values.password,
			email: values.email,
			employeeId: employeeID,
			userGroupId: userGroupID,
		};
		creatUser(params)
			.then(res => {
				console.log(res);
				message.success(MessageConstantSuccess.createUserSuccess);
				navigate('/home');
			})
			.catch(err => {
				switch (err.response.data.error.code) {
					case errorAuth.HAD_ACCOUNT:
						message.error(MessageConstantError.staffHasAccount);
						break;
					case errorAuth.EMAIL_ALREADY:
						message.error(MessageConstantError.EmailHad);
						break;
					default:
						message.error(MessageConstantError.createUserUnsuccess);
				}
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const arrayValue = dataUserAll.map((item: any, index) => {
		return item.userGroup.name;
	});

	if (!isModalVisible) {
		formModalCreate.setFieldsValue({
			staff: '',
			username: '',
			email: '',
			password: '',
			rePassword: '',
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
			visible={isModalVisible}
			//  onOk={handleOk}
			onCancel={handleCancel}
			footer={null}
		>
			<h1>TẠO MỚI TÀI KHOẢN NGƯỜI DÙNG</h1>
			<Form
				form={formModalCreate}
				name="formModalCreate"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label={<label className="font-semibold text-[16px]">Nhân viên</label>}
					name="staff"
					rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
				>
					<Select>
						{dataUserAll
							.filter((item: any) => {
								return item.status.displayText === 'Đang hoạt động';
							})
							.map((item: any, index: number) => {
								if (item.employee!) {
									// setEmployeeId(item.employee.id);
									// setUserGroupId(item.userGroup.id);
									return (
										<Option key={index}>
											{item?.employee?.no}-{item?.employee?.name}
										</Option>
									);
								}
							})}
					</Select>
				</Form.Item>

				<Form.Item
					label={<label className="font-semibold text-[16px]">Tên đăng nhập</label>}
					name="username"
					rules={[
						{
							validator(rule, value) {
								const check = /^[a-zA-Z0-9]+$/;
								// check if no store selected
								// const storeOther = productsFormValue[index]?.store_other;
								if (value == '' || value == undefined || value == null) {
									return Promise.reject(new Error('Vui lòng nhập tên đăng nhập!'));
								} else if (!check.test(value)) {
									return Promise.reject(
										new Error('Chỉ được phép nhập chữ và số, không nhập ký tự đặc biệt!'),
									);
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
					label={<label className="font-semibold text-[16px]">Email</label>}
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
					label={<label className="font-semibold text-[16px]">Mật khẩu</label>}
					name="password"
					rules={[
						{
							validator(rule, value) {
								const lengthValue = value.length;
								if (value == '' || value == undefined || value == null) {
									return Promise.reject(new Error('Vui lòng nhập mật khẩu!'));
								} else if (lengthValue < 8) {
									return Promise.reject(
										new Error('Mật khẩu tối thiểu 8 ký tự, vui lòng kiểm tra lại'),
									);
								} else {
									return Promise.resolve();
								}
							},
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label={<label className="font-semibold text-[16px]">Nhập lại mật khẩu</label>}
					name="rePassword"
					rules={[
						{
							validator(rule, value) {
								const getPass = formModalCreate.getFieldValue('password');
								if (value == '' || value == undefined || value == null) {
									return Promise.reject(new Error('Vui lòng xác nhận mật khẩu!'));
								} else if (value != getPass) {
									return Promise.reject(new Error('Mật khẩu không khớp vui lòng kiểm tra lại'));
								} else {
									return Promise.resolve();
								}
							},
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label={<label className="font-semibold text-[16px]">Vai trò của người dùng</label>}
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
						onClick={handleCancel}
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
