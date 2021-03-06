import './ModalConfirm.scss';
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

const statusUserConfirm = {
	active: 'Active',
	inactive: 'Inactive',
};
export default function ModalConfirm(props: any) {
	const navigate = useNavigate();
	const {
		isModalVisibleConfirm,
		setIsModalVisibleConfirm,
		handleCancelConfirm,
		statusUser,
		idUserUseConfirm,
		dataUser,
	} = props;
	const handleContinue = () => {
		const objConfirm = { id: idUserUseConfirm };
		dataUser.map((item: any, index: number) => {
			if (idUserUseConfirm === item.id) {
				{
					statusUser === statusUserConfirm.active
						? (dataUser[index].status.value = 'Inactive')
						: (dataUser[index].status.value = 'Active');
				}
			}
		});
		changeActivityUser(objConfirm)
			.then(res => {
				console.log(res);
				message.success(MessageConstantSuccess.updateStatusSuccess);
			})
			.catch(err => {
				console.log(err);
				message.success(MessageConstantError.updateStatusUnSuccess);
			});
		setIsModalVisibleConfirm(false);
	};
	return (
		<div>
			<Modal visible={isModalVisibleConfirm} centered onCancel={handleCancelConfirm} footer={null}>
				{statusUser == statusUserConfirm.active ? (
					<>
						<h1>XÁC NHẬN VÔ HIỆU HÓA TÀI KHOẢN CỦA NGƯỜI DÙNG</h1>
						<p>Bạn có chắc muốn vô hiệu hóa tài khoản của người dùng này</p>
					</>
				) : (
					<>
						<h1>XÁC NHẬN KÍCH HOẠT TÀI KHOẢN CỦA NGƯỜI DÙNG</h1>
						<p>Bạn có chắc muốn kích hoạt tài khoản của người dùng này</p>
					</>
				)}
				<div className="flex justify-end">
					<Button onClick={handleCancelConfirm}>Không</Button>
					<Button className="ml-2" onClick={handleContinue}>
						Đồng ý
					</Button>
				</div>
			</Modal>
		</div>
	);
}
