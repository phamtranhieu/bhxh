import './ModalReset.scss';
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

import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

export default function ModalReset(props: any) {
	const [formModalEdit] = Form.useForm();
	const { isModalVisibleReset, handleCancelReset, handleOkReset, userName, setIsModalVisibleReset, idUserUse } =
		props;
	const [dataUserAll, setDataUserAll] = useState([]);

	const [isModalVisibleResetContinue, setIsModalVisibleResetContinue] = useState(false);
	const showModalContinue = () => {
		setIsModalVisibleResetContinue(true);
	};

	const handleOkContinue = () => {
		setIsModalVisibleResetContinue(false);
	};

	const handleCancelContinue = () => {
		setIsModalVisibleResetContinue(false);
	};
	console.log(dataUserAll);
	// const onFinish = (values: any) => {
	// 	console.log(values);
	// 	const numberStaffEdit = values.staffEdit;
	// 	const data = dataUserAll
	// 		.filter((item: any) => {
	// 			return item.status.displayText === 'Đang hoạt động';
	// 		})
	// 		.map((item: any, index: number) => {
	// 			if (item.employee!) {
	// 				return item;
	// 			}
	// 		});
	// 	const IDEdit = data.find((item, index) => {
	// 		if (numberStaffEdit == index) {
	// 			return item;
	// 		}
	// 	}).id;
	// 	const employeeIDEdit = data.find((item, index) => {
	// 		if (numberStaffEdit == index) {
	// 			return item;
	// 		}
	// 	}).employee.id;
	// 	const userGroupIDEdit = data.find((item, index) => {
	// 		if (numberStaffEdit == index) {
	// 			return item;
	// 		}
	// 	}).userGroup.id;
	// 	console.log(data);

	// 	const params = {
	// 		id: IDEdit,
	// 		email: values.email,
	// 		employeeId: employeeIDEdit,
	// 		userGroupId: userGroupIDEdit,
	// 	};
	// 	updateUser(params)
	// 		.then(res => {
	// 			console.log(res);
	// 			message.success('Cập nhật tài khoản người dùng thành công');
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 			message.error('Cập nhật tài khoản người dùng thất bại');
	// 			// if (err.response.data.error.code == 'EMPLOYEE_ALREADY_HAS_AN_ACCOUNT') {
	// 			// 	message.error('Nhân viên đã có tài khoản');
	// 			// } else {
	// 			// 	message.error('Tạo mới tài khoản người dùng thất bại');
	// 			// }
	// 		});
	// };

	// const onFinishFailed = (errorInfo: any) => {
	// 	console.log('Failed:', errorInfo);
	// };
	const arrayValue = dataUserAll.map((item: any, index) => {
		return item.userGroup.name;
	});
	if (!isModalVisibleReset) {
		formModalEdit.setFieldsValue({
			staffEdit: '',
			usernameEdit: '',
			email: '',
			action: '',
		});
	}
	// else {
	// 	formModalEdit.setFieldsValue({
	// 		username: userName,
	// 	});
	// }

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
	console.log(userName);
	const handleContinue = () => {
		setIsModalVisibleReset(false);
		setIsModalVisibleResetContinue(true);
	};
	const onFinish = (values: any) => {
		console.log('Success:', values);
		const payLoad = { id: idUserUse };
		resetPasssUser(payLoad)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div>
			<Modal
				visible={isModalVisibleReset}
				centered
				//  onOk={handleOk}
				onCancel={handleCancelReset}
				footer={null}
			>
				<h1>XÁC NHẬN TÁI TẠO MẬT KHẨU NGƯỜI DÙNG</h1>
				<p>Bạn có chắc muốn tái tạo mật khẩu tài khoản người dùng này</p>
				<div className="flex justify-end">
					<Button>Không</Button>
					<Button className="ml-2" onClick={handleContinue}>
						Đồng ý
					</Button>
				</div>
			</Modal>
			<Modal
				visible={isModalVisibleResetContinue}
				centered
				onOk={handleOkContinue}
				onCancel={handleCancelContinue}
				footer={null}
				className="h-[180px]"
			>
				<h1>MẬT KHẨU MỚI</h1>
				<Form
					form={formModalEdit}
					name="formModalReset"
					labelCol={{ span: 16 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className="w-full"
				>
					<Form.Item
						label={
							<label className="font-semibold text-[16px] text-start">
								Mật khẩu mới cho tài khoản này
							</label>
						}
						name="resetPassword"
						rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						style={{ marginTop: '10px' }}
						className="flex justify-end mt-5"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Button className="w-[100px]">Đóng</Button>
						<Button className="w-[100px] ml-5" type="primary" htmlType="submit">
							Sao chép
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
