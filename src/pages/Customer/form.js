import React from "react";
import PropTypes from 'prop-types';
import { Form, Button, Select, Input, InputNumber } from "antd";
import { StyledForm } from "./style";

const CustomerForm = ({
  onSubmit,
  customer = {}
}) => {
  /*eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a validate number!',
    }
  };

  const { name, age, angular } = customer;

  return (
    <StyledForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      onFinish={onSubmit}
      validateMessages={validateMessages}
    >
      <Form.Item label="Name" name="name" rules={[{required: true}]} initialValue={name}>
        <Input/>
      </Form.Item>
      <Form.Item label="Age" name="age" rules={[{required: true, type: 'number'}]} initialValue={age}>
        <InputNumber/>
      </Form.Item>
      <Form.Item label="Angular" name="angular" rules={[{required: true}]} initialValue={angular}>
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="both">Can't say</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{textAlign: "center"}}>
        <Button htmlType="submit" type="primary" style={{background: "black", color: "white"}}>{customer.id ? "Update" : "Create"}</Button>
      </Form.Item>
    </StyledForm>
  )
};

CustomerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.object
};
export default CustomerForm;