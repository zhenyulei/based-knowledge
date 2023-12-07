---
sidebarDepth: 1
---

# Ant组件库使用经验

- 1、form表单中 Form.Item 需要直接包裹Select组件，不能在Select组件外面写其他元素，否则submit提交后无法获取Select选择的内容；
- 2、Row组件中的gutter 设置的是两个Col组件间的间距，比如设置了20，则每个Col的左右边距分别是10；
- 3、Form表单水平分布，然后每个选项平均分布，需要设置layout={'horizontal'}，在用Row和Col包裹Form.Item


```tsx
import React, { useState } from 'react';
import { Form, Input, Button, Select, Col, Row } from '@drip/drip-design';
const { Option } = Select;
const FormLayoutDemo = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <Form
      layout={'horizontal'}
      form={form}
      initialValues={{
        layout: formLayout
      }}
      onFinish={onFinish}
    >
      <Row gutter={20} wrap>
        <Col span={6}>
          <Form.Item label="字段1" name="remember">
            <Select defaultValue="lucy" onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="字段2" name="remember2">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="字段3" name="remember3">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="字段3" name="remember4">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="字段3" name="remember5">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="字段4"
            labelCol={{
              span: 12
            }}
            wrapperCol={{
              span: 12
            }}
          >
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default">Submit</Button>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default FormLayoutDemo;
```