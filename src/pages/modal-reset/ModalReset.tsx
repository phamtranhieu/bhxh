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
import { useNavigate } from 'react-router-dom';
import { EditOutlined, KeyOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { MessageConstantError, MessageConstantSuccess } from '../../constant/auth/auth.constant';

export default function ModalReset(props: any) {
	const navigate = useNavigate();
	const [formModalReset] = Form.useForm();
	const { isModalVisibleReset, handleCancelReset, handleOkReset, userName, setIsModalVisibleReset, idUserUse } =
		props;
	const [dataUserAll, setDataUserAll] = useState([]);
	const [stringPassword, setStringPassword] = useState('');

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

	const arrayValue = dataUserAll.map((item: any, index) => {
		return item.userGroup.name;
	});
	if (!isModalVisibleReset) {
		formModalReset.setFieldsValue({
			resetPassword: '',
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

	const handleContinue = () => {
		setIsModalVisibleReset(false);
		const payLoad = { id: idUserUse };
		resetPasssUser(payLoad)
			.then(res => {
				console.log(res);
				setStringPassword(res.data.data.password);
			})
			.catch(err => {
				console.log(err);
				message.error(MessageConstantError.changePassUnsuccess);
			});
		setIsModalVisibleResetContinue(true);
	};

	const onFinish = (values: any) => {
		formModalReset.setFieldsValue({
			resetPassword: stringPassword,
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
				<h1>X??C NH???N T??I T???O M???T KH???U NG?????I D??NG</h1>
				<p>B???n c?? ch???c mu???n t??i t???o m???t kh???u t??i kho???n ng?????i d??ng n??y</p>
				<div className="flex justify-end">
					<Button>Kh??ng</Button>
					<Button className="ml-2" onClick={handleContinue}>
						?????ng ??
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
				<h1>M???T KH???U M???I</h1>
				<Form
					form={formModalReset}
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
							<label className="font-semibold text-base text-left">M???t kh???u m???i cho t??i kho???n n??y</label>
						}
						name="resetPassword"
					>
						<Input />
					</Form.Item>
					<Form.Item className="flex justify-end mt-5" wrapperCol={{ offset: 8, span: 16 }}>
						<Button className="w-[100px]">????ng</Button>
						<Button className="w-[100px] ml-5" type="primary" htmlType="submit">
							Sao ch??p
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
