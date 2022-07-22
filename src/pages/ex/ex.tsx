import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { isTemplateMiddleOrTemplateTail } from 'typescript';
import { fileURLToPath } from 'url';
import { getAllFunctionGroupUser } from '../../service/group/GroupUserService';

const { Option } = Select;
export default function ex() {
	const [dataFunction, setDataFunction] = useState([]);
	useEffect(() => {
		getAllFunctionGroupUser()
			.then(res => {
				console.log(res);
				setDataFunction(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	const onFinish = (values: any) => {
		console.log('Received values of form:', values);
	};
	console.log(dataFunction);
	return (
		<div>
			<Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" initialValues={{ users: [''] }}>
				<Form.List name="users">
					{(fields, { add, remove }) => (
						<>
							{dataFunction.map((item: any, index) => {
								// console.log(field);
								// return dataFunction.map((item: any, index) => {
								// 	console.log(index);
								return (
									<>
										<h1>{item.description}</h1>
										<Space
											key={index}
											style={{ display: 'flex', marginBottom: 8 }}
											align="baseline"
										>
											<Form.Item
												// {...restField}
												name={[index, 'first']}
												className="w-[150px]"
												// rules={[{ required: true, message: 'Missing first name' }]}
											>
												<Select className="w-full">
													<Option key="1" value="1">
														1
													</Option>
													<Option key="2" value="2">
														2
													</Option>
													<Option key="3" value="3">
														3
													</Option>
												</Select>
											</Form.Item>
											<Form.Item
												// {...restField}
												name={[index, 'last']}
												className="w-[150px]"
												// rules={[{ required: true, message: 'Missing last name' }]}
											>
												<Select className="w-full">
													<Option key="1" value="1">
														1
													</Option>
													<Option key="2" value="2">
														2
													</Option>
													<Option key="3" value="3">
														3
													</Option>
												</Select>
											</Form.Item>
											<Form.Item
												// {...restField}
												name={[index, 'hieu']}
												className="w-[150px]"
												// rules={[{ required: true, message: 'Missing last name' }]}
											>
												<Select className="w-full">
													<Option key="1" value="1">
														1
													</Option>
													<Option key="2" value="2">
														2
													</Option>
													<Option key="3" value="3">
														3
													</Option>
												</Select>
											</Form.Item>
											<Form.Item
												// {...restField}
												name={[index, 'nhu']}
												className="w-[150px]"
												// rules={[{ required: true, message: 'Missing last name' }]}
											>
												<Select className="w-[150px]">
													<Option key="1" value="1">
														1
													</Option>
													<Option key="2" value="2">
														2
													</Option>
													<Option key="3" value="3">
														3
													</Option>
												</Select>
											</Form.Item>
										</Space>
									</>
								);
								// });
							})}
						</>
					)}
				</Form.List>

				<Form.Item>
					<Button className="ml-5" type="primary" htmlType="submit">
						Lưu thông tin
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
