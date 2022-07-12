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

export default function ModalConfirm(props: any) {
	const navigate = useNavigate();
	const { isModalVisibleConfirm, handleCancelConfirm, handleOkConfirm, statusUser, idUserUseConfirm } = props;
	const handleContinue = () => {
		const objConfirm = { id: idUserUseConfirm };
		changeActivityUser(objConfirm)
			.then(res => {
				console.log(res);
				message.success('Bạn đã cập nhật trạng thái thành công');
				navigate('/home');
			})
			.catch(err => {
				console.log(err);
				message.success('Bạn đã cập nhật trạng thái thất bại');
			});
		handleCancelConfirm();
	};
	return (
		<div>
			<Modal
				visible={isModalVisibleConfirm}
				centered
				onOk={handleOkConfirm}
				onCancel={handleCancelConfirm}
				footer={null}
			>
				{statusUser == 'Active' ? (
					<h1>XÁC NHẬN VÔ HIỆU HÓA TÀI KHOẢN CỦA NGƯỜI DÙNG</h1>
				) : (
					<h1>XÁC NHẬN KÍCH HOẠT TÀI KHOẢN CỦA NGƯỜI DÙNG</h1>
				)}
				{statusUser === 'Active' ? (
					<p>Bạn có chắc muốn vô hiệu hóa tài khoản của người dùng này</p>
				) : (
					<p>Bạn có chắc muốn kích hoạt tài khoản của người dùng này</p>
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
