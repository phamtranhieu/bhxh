import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../interface/auth/auth.interface';
import {
	DesktopOutlined,
	FileOutlined,
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
	BellOutlined,
	DownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, message } from 'antd';
import { data } from './dataHome';
import { typeDataSlider, typeDataSliderChild } from '../../interface/auth/auth.interface';
import './Home.scss';
import { useNavigate, Outlet } from 'react-router-dom';
import { deleteAccessToken, deleteUserAndPasswordLocal } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';
import { userLogout } from '../../service/auth/AuthService';

const { Header, Content, Footer, Sider } = Layout;

const dataSlider = data.map((item: any, index: number) => {
	return {
		key: index,
		label: item.title,
		children: item.dataChild?.map((item: typeDataSliderChild, indexChild: number) => {
			return {
				key: indexChild,
				label: item.titleChild,
			};
		}),
	};
});

export default function Home() {
	const uuid = require('react-uuid');
	const { Header, Sider, Content } = Layout;
	const navigate = useNavigate();
	const handleLogout = () => {
		const accessToken = localStorage.getItem(configApp.tokenKey);
		userLogout(accessToken!)
			.then(res => {
				console.log(res);
				message.success('Bạn đã đăng xuất thành công');
				deleteUserAndPasswordLocal();
				navigate('/');
			})
			.catch(err => {
				message.error('Bạn đã đăng xuất thất bại');
				console.log(err);
			});
		// deleteAccessToken();
	};
	const handleChangePass = () => {
		navigate('/home/change-password');
	};
	return (
		// <div>
		<Layout className="h-[100vh]">
			<Header className="header flex items-center w-full justify-between h-[200px]">
				<div className="flex items-center">
					<UserOutlined style={{ color: 'white', marginRight: '20px' }} />
					<p className="text-white mb-0 title">NỀN TẢNG BẢO TRÌ MÁY MÓC THIẾT BỊ</p>
				</div>
				<div className="flex items-center ">
					<BellOutlined style={{ color: 'white', marginRight: '20px' }} />
					<div className="relative button-down p-[20px] flex justify-center items-center">
						<DownOutlined style={{ color: 'white' }} />
						<ul
							className="list"
							style={{
								color: 'white',
								backgroundColor: 'white',
								position: 'absolute',
								boxShadow: '2px 5px 10px gray',
								width: '85px',
								top: '50px',
								left: '-45px',
							}}
						>
							<li style={{ color: 'black', textAlign: 'center' }} onClick={handleChangePass}>
								Đổi mật khẩu
							</li>
							<li style={{ color: 'black', textAlign: 'center' }} onClick={handleLogout}>
								Đăng xuất
							</li>
						</ul>
					</div>
				</div>
			</Header>
			<div className="w-full h-[50px] text-[20px] font-semibold flex items-center ml-5">TRANG CHỦ</div>
			<Layout style={{ height: '100%', backgroundColor: 'gray', padding: '5px' }}>
				<Sider width={200} className="site-layout-background ">
					<Menu
						mode="inline"
						key={uuid}
						// defaultSelectedKeys={['1']}
						// defaultOpenKeys={['QUẢN LÝ TÀI KH']}
						style={{ height: '100%', borderRight: 0 }}
						items={dataSlider}
					/>
				</Sider>
				<Layout style={{ padding: '0 24px 24px', backgroundColor: 'white', marginLeft: '5px' }}>
					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
		// </div>
	);
}
