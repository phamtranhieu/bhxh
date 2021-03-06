import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeUser } from '../../interface/auth/auth.interface';

import { Breadcrumb, Layout, Menu, message } from 'antd';
import { data } from './dataHome';
import { typeDataSlider, typeDataSliderChild } from '../../interface/auth/auth.interface';
import './Home.scss';
import { useNavigate, Outlet } from 'react-router-dom';
import { deleteAccessToken, deleteUserAndPasswordLocal } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';
import { userLogout } from '../../service/auth/AuthService';
import { MessageConstantError, MessageConstantSuccess } from '../../constant/auth/auth.constant';
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
	UserOutlined,
	DownOutlined,
	BellOutlined,
} from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
	type MenuItem = Required<MenuProps>['items'][number];
	const uuid = require('react-uuid');
	const { Header, Sider, Content } = Layout;
	const navigate = useNavigate();

	function getItem(
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: 'group',
	): MenuItem {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem;
	}

	// const dataSlider = data.map((item: any, index: number) => {
	// 	return {
	// 		key: index,
	// 		label: item.title,
	// 		children: item.dataChild?.map((item: typeDataSliderChild, indexChild: number) => {
	// 			return {
	// 				key: indexChild,
	// 				label: item.titleChild,
	// 				// onclick: navigate(item.click),
	// 			};
	// 		}),
	// 	};
	// });

	const items: MenuItem[] = [
		getItem('QUẢN LÝ TÀI KHOẢN', 'sub1', <MailOutlined />, [
			getItem('Tài khoản người dùng', '/home/control-user'),
			getItem('Nhóm người dùng', '/home/role-user'),
		]),

		getItem('QUẢN LÝ DỮ LIỆU NGUỒN', 'sub2', <AppstoreOutlined />, [
			// getItem('Option 5', '5'),
			// getItem('Option 6', '6'),
			// getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
		]),

		getItem('QUẢN LÝ MÁY MÓC THIẾT BỊ', 'sub3', <SettingOutlined />, [
			// getItem('Option 9', '9'),
			// getItem('Option 10', '10'),
			// getItem('Option 11', '11'),
			// getItem('Option 12', '12'),
		]),
		getItem('QUẢN LÝ NGHIỆP VỤ', 'sub4', <SettingOutlined />, [
			// getItem('Option 9', '9'),
			// getItem('Option 10', '10'),
			// getItem('Option 11', '11'),
			// getItem('Option 12', '12'),
		]),
	];

	const handleLogout = () => {
		const accessToken = localStorage.getItem(configApp.tokenKey);
		userLogout(accessToken!)
			.then(res => {
				console.log(res);
				message.success(MessageConstantSuccess.loginSuccess);
				deleteUserAndPasswordLocal();
				navigate('/');
			})
			.catch(err => {
				message.error(MessageConstantError.logoutUnSuccess);
				console.log(err);
			});
		// deleteAccessToken();
	};
	const handleChangePass = () => {
		navigate('/home/change-password');
	};
	const onClick: MenuProps['onClick'] = e => {
		console.log('click', e.key);
		navigate(e.key);
	};
	return (
		// <div>
		<Layout className="">
			<Header className="header flex items-center w-full justify-between h-[200px]">
				<div className="flex items-center text-white ">
					<UserOutlined
						onClick={() => {
							navigate('/home');
						}}
						className="mr-[20px]"
					/>
					<p className="text-white mb-0 title">NỀN TẢNG BẢO TRÌ MÁY MÓC THIẾT BỊ</p>
				</div>
				<div className="flex items-center text-white mr-[20px] ">
					<BellOutlined className=" mr-[20px]" />
					<div className="relative button-down p-[20px] flex justify-center items-center">
						<DownOutlined className="text-white" />
						<ul className="list text-white bg-white absolute w-[85px] top-[50px] left-[-45px]">
							<li className="text-[black] text-center h-[50px] leading-10" onClick={handleChangePass}>
								Đổi mật khẩu
							</li>
							<li className=" text-[black] text-center h-[50px] leading-10" onClick={handleLogout}>
								Đăng xuất
							</li>
						</ul>
					</div>
				</div>
			</Header>
			<div className="w-full h-[50px] text-[20px] font-semibold flex items-center ml-5">TRANG CHỦ</div>
			<Layout className="h-full bg-[gray] p-[5px]">
				<Sider width={200} className="site-layout-background lg:hidden">
					<Menu mode="inline" key={uuid} className="h-full border-r-0 " items={items} onClick={onClick} />
				</Sider>
				<Layout className="p-[0 24px 24px] ml-[5px]" style={{ backgroundColor: 'white' }}>
					<Content className="site-layout-background p-[24px] m-0 min-h-[280px]">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
