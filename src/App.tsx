import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { message, Spin } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useAppSelector } from './app/hook';
import { useDispatch, useSelector } from 'react-redux';

function App() {
	const isAppLoading = useAppSelector(state => state.app.isAppLoading);
	const isSpin = useSelector(state => console.log(state));
	console.log(isSpin);
	return (
		// <Spin size="large" spinning={isAppLoading}>
		<div className="App">
			<Outlet />
		</div>
		// </Spin>
	);
}

export default App;
