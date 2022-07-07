import React, { useState } from 'react';

import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import tool from '../../image/tool.jpg';
import email from '../../image/email.jpg';
import password from '../../image/password.jpg';
import './Authenticate.scss';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { FolderOutlined, LockOutlined } from '@ant-design/icons';
import useAppLoading from '../../hook/useAppLoading';

import { userLogin } from '../../service/auth/AuthService';
import { userAction } from '../../reducer/userReducer';
import { appAction } from '../../reducer/appReducer';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setUserAndPasswordLocal } from '../../helper/tokenHelper';
import { authInterface } from '../../interface/auth/auth.interface';

export default function Authenticate() {
	const [, setAppLoading] = useAppLoading();
	const [isWrongPass, setIsWrongPass] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	var CryptoJS = require('crypto-js');
	const [isSpin, setIsSpin] = useState(false);

	const onFinish = (values: authInterface) => {
		const SALT =
			'n3beYvkHzZimLUrMDWRWMXFknFulI6AKZ1qunqiIznjT5JjsJ80VbPbUOaJMWiJBmx9HzylJRvURI7AVHoGENEu9v6lT7F5fRWtc';

		const parsedSalt = CryptoJS.enc.Base64.parse(SALT);
		const resultPassword = CryptoJS.PBKDF2(values.password, parsedSalt, {
			keySize: 64 / 4,
			iterations: 1000,
			hasher: CryptoJS.algo.SHA512,
		});
		const realPass = CryptoJS.enc.Base64.stringify(resultPassword);
		const realParams = {
			userName: values.userName,
			password: values.password,
		};
		const params = {
			userName: values.userName,
			password: realPass,
		};
		setIsWrongPass(false);
		setIsSpin(true);
		userLogin(params, realParams)
			.then(res => {
				console.log(res);
				dispatch(userAction.setUserLogin(res.data.data));
				setAccessToken(res.data.data.accessToken);
				setUserAndPasswordLocal(realParams);
				message.success('Đăng nhập thành công !');
				navigate('/home');
				setIsSpin(false);
			})
			.catch(error => {
				console.log(error);
				if (error.response.data.error.code == 'WRONG_USERNAME') {
					message.error('Email hoặc tên đăng nhập không đúng, vui lòng kiểm tra lại!');
				} else if (error.response.data.error.code == 'WRONG_PASSWORD') {
					message.error('Mật khẩu không đúng, vui lòng kiểm tra lại!');
				} else {
					message.error('Đăng nhập thất bại!');
				}
				setIsWrongPass(true);
				setIsSpin(false);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Spin size="small" spinning={isSpin} delay={1000}>
			<div className="bgLogin flex items-center">
				<div className="w-[1000px] h-[600px] m-auto bg-white rounded-lg flex justify-evenly">
					<div className="w-[400px] h-[300px] my-auto">
						<img src={tool} className="w-[400px] h-[300px] flex items-center" />
					</div>
					<div className="w-[400px] h-[350px] my-auto">
						<p className="w-[327px] h-[42px] font-semibold text-[32px] text-center">ĐĂNG NHẬP</p>
						<Form
							name="basic"
							// labelCol={{ span: 8 }}
							wrapperCol={{ span: 32 }}
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
							<Form.Item
								style={{ marginBottom: '20px' }}
								name="userName"
								rules={[{ required: true, message: 'Vui lòng nhập email/ tên đăng nhập' }]}
							>
								<Input
									prefix={<FolderOutlined style={{ marginRight: '10px' }} />}
									placeholder="Email/ Tên tài khoản (*)"
								/>
							</Form.Item>
							<Form.Item
								style={{ marginBottom: '20px' }}
								name="password"
								rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
							>
								<Input
									prefix={<LockOutlined style={{ marginRight: '10px' }} />}
									placeholder="Mật Khẩu (*)"
								/>
							</Form.Item>

							<Form.Item wrapperCol={{ offset: 32, span: 32 }}>
								<Button
									danger
									type="primary"
									htmlType="submit"
									style={{ width: '100%', borderRadius: '10px' }}
								>
									ĐĂNG NHẬP
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</Spin>
	);
}
