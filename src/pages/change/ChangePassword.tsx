import './ChangePassword';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { userChangePassword } from '../../service/auth/AuthService';
import { useNavigate, Outlet } from 'react-router-dom';
import { MessageConstantError, MessageConstantSuccess } from '../../constant/auth/auth.constant';

export default function ChangePassword() {
	const navigate = useNavigate();
	var CryptoJS = require('crypto-js');
	const [formBasic] = Form.useForm();
	const onFinish = (values: any) => {
		const SALT =
			'n3beYvkHzZimLUrMDWRWMXFknFulI6AKZ1qunqiIznjT5JjsJ80VbPbUOaJMWiJBmx9HzylJRvURI7AVHoGENEu9v6lT7F5fRWtc';

		const parsedSalt = CryptoJS.enc.Base64.parse(SALT);
		const resultPassword = CryptoJS.PBKDF2(values.oldPassword, parsedSalt, {
			keySize: 64 / 4,
			iterations: 1000,
			hasher: CryptoJS.algo.SHA512,
		});
		const realOldPass = CryptoJS.enc.Base64.stringify(resultPassword);
		const params = {
			oldPassword: realOldPass,
			password: values.password,
		};
		console.log(params);
		userChangePassword(params)
			.then((res: any) => {
				console.log(res);
				message.success(MessageConstantSuccess.changePasswordSuccess);
				navigate('/home');
			})
			.catch(err => {
				console.log(err);
				message.error(MessageConstantError.changePassUnsuccess);
			});
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<h1>THAY ĐỔI MẬT KHẨU</h1>
			<Form
				form={formBasic}
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				className="flex justify-between w-full"
			>
				<div className="w-[600px]">
					<Form.Item
						label={<label className="text-left">Mật khẩu hiện tại</label>}
						name="oldPassword"
						rules={[
							{
								validator(rule, val) {
									const realOldPassword = formBasic.getFieldValue('oldPassword');
									const localInfo = localStorage.getItem('useInfo');
									const result = JSON.parse(localInfo!);
									const realResult = {
										userName: result.userName,
										password: result.password,
									};
									if (val == undefined || val == null || val == '') {
										return Promise.reject(new Error('Bạn vui lòng nhập trường này'));
									} else if (val != realResult.password) {
										return Promise.reject(new Error('Mật khẩu không đúng vui lòng kiểm tra lại'));
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
						label={<label className="">Mật khẩu mới</label>}
						name="password"
						rules={[
							{
								validator(rule, val) {
									if (val == undefined || val == null || val == '') {
										return Promise.reject(new Error('Bạn vui lòng nhập trường này'));
									} else if (val.length < 8) {
										return Promise.reject(new Error('Bạn vui lòng nhập tối thiểu 8 ký tự'));
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
						label={<label className="">Xác nhận mật khẩu mới</label>}
						name="confirm-password"
						rules={[
							{
								validator(rule, val) {
									const realPassword = formBasic.getFieldValue('password');
									if (val == undefined || val == null || val == '') {
										return Promise.reject(new Error('Bạn vui lòng nhập trường này'));
									} else if (val.length < 8) {
										return Promise.reject(new Error('Bạn vui lòng nhập tối thiểu 8 ký tự'));
									} else if (val != realPassword) {
										return Promise.reject(new Error('Mật khẩu không khớp, vui lòng kiểm tra lại'));
									} else {
										return Promise.resolve();
									}
								},
							},
						]}
					>
						<Input.Password />
					</Form.Item>
				</div>
				<div>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Lưu thông tin
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
}
