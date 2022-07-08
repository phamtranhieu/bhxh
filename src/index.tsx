import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

import Authenticate from './pages/authenticate/Authenticate';
import Home from './pages/home/Home';
import ChangePassword from './pages/change/ChangePassword';
import ControlUser from './pages/control-user/ControlUser';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Authenticate />} />
					<Route path="/home" element={<Home />}>
						<Route path="change-password" element={<ChangePassword />} />
						<Route path="control-user" element={<ControlUser />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
