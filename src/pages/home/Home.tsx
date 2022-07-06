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
import { Breadcrumb, Layout, Menu } from 'antd';
import { data } from './dataHome';
import { typeDataSlider, typeDataSliderChild } from '../../interface/auth/auth.interface';
import './Home.scss';

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
	const { Header, Sider, Content } = Layout;

	return (
		// <div>
		<Layout>
			<Header className="header flex items-center w-full justify-between">
				<div className="flex items-center">
					<UserOutlined style={{ color: 'white', marginRight: '20px' }} />
					<p className="text-white mb-0 title">NỀN TẢNG BẢO TRÌ MÁY MÓC THIẾT BỊ</p>
				</div>
				<div className="flex items-center ">
					<BellOutlined style={{ color: 'white', marginRight: '20px' }} />
					<div className="relative">
						<DownOutlined style={{ color: 'white' }} className="button-down " />
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
							<li style={{ color: 'black', textAlign: 'center' }}>Đổi mật khẩu</li>
							<li style={{ color: 'black', textAlign: 'center' }}>Đăng xuất</li>
						</ul>
					</div>
				</div>
			</Header>

			<Layout style={{ height: '100%' }}>
				<Sider width={200} className="site-layout-background">
					<Menu
						mode="inline"
						// defaultSelectedKeys={['1']}
						// defaultOpenKeys={['QUẢN LÝ TÀI KH']}
						style={{ height: '100%', borderRight: 0 }}
						items={dataSlider}
					/>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						Content
					</Content>
				</Layout>
			</Layout>
		</Layout>
		// </div>
	);
}
