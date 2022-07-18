import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';

export default function CreateUserGroup() {
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div>
			<div className="flex justify-between">
				<h1>TẠO MỚI VAI TRÒ CỦA NGƯỜI DÙNG</h1>
				<div>
					<Button>Hủy thao tác</Button>
					<Button>Lưu thông tin</Button>
				</div>
			</div>
			<div>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label={<label>Vai trò người dùng (*)</label>}
						name="username"
						rules={[{ required: true, message: 'Vui lòng nhập vai trò của người dùng' }]}
					>
						<Input className="w-[200px]" />
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
						<Checkbox>Thuộc nhóm toàn quyền quản lý hệ thống</Checkbox>
					</Form.Item>

					<p>Phân quyền chi tiết (*)</p>
					{/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item> */}
				</Form>
			</div>
		</div>
	);
}
