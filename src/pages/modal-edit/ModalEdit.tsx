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

export default function ModalEdit(props: any) {
	const navigate = useNavigate();
	const [formModalEdit] = Form.useForm();
	const { isModalVisibleEdit, handleCancelEdit, handleOkEdit, userName } = props;
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
		console.log(data);

		const params = {
			id: IDEdit,
			email: values.email,
			employeeId: employeeIDEdit,
			userGroupId: userGroupIDEdit,
		};
		updateUser(params)
			.then(res => {
				console.log(res);
				message.success('Cập nhật tài khoản người dùng thành công');
				navigate('/home');
			})
			.catch(err => {
				console.log(err);
				message.error('Cập nhật tài khoản người dùng thất bại');
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
					label={<label className="font-semibold text-[16px]">Nhân viên</label>}
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

				<Form.Item
					label={<label className="font-semibold text-[16px]">Tên đăng nhập</label>}
					name="usernameEdit"
					initialValue={userName}
					// rules={[
					// 	{
					// 		validator(rule, value) {
					// 			const check = /^[a-zA-Z0-9]+$/;
					// 			// check if no store selected
					// 			// const storeOther = productsFormValue[index]?.store_other;
					// 			if (value == '' || value == undefined || value == null) {
					// 				return Promise.reject(new Error('Vui lòng nhập tên đăng nhập!'));
					// 			} else if (!check.test(value)) {
					// 				return Promise.reject(
					// 					new Error('Chỉ được phép nhập chữ và số, không nhập ký tự đặc biệt!'),
					// 				);
					// 			} else {
					// 				return Promise.resolve();
					// 			}
					// 		},
					// 	},
					// ]}
				>
					<Input placeholder={userName} disabled />
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
