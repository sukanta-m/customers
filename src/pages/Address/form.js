import React from "react";
import PropTypes from 'prop-types';
import { Form, Button, Input, InputNumber } from "antd";
import { StyledForm } from "../Customer/style";

const AddressForm = ({
  onSubmit,
  address = {}
}) => {
  /*eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a validate number!',
    }
  };

  const { street1, street2, city, state, country, pin } = address;

  return (
    <StyledForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      onFinish={onSubmit}
      validateMessages={validateMessages}
    >
      <Form.Item label="Street1" name="street1" rules={[{required: true}]} initialValue={street1}>
        <Input/>
      </Form.Item>
      <Form.Item label="Street2" name="street2" initialValue={street2}>
        <Input/>
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{required: true}]} initialValue={city}>
        <Input/>
      </Form.Item>
      <Form.Item label="State" name="state" rules={[{required: true}]} initialValue={state}>
        <Input/>
      </Form.Item>
      <Form.Item label="Country" name="country" rules={[{required: true}]} initialValue={country}>
        <Input/>
      </Form.Item>
      <Form.Item label="Postal code" name="pin" rules={[{required: true, type: "number"}]} initialValue={pin}>
        <InputNumber/>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{textAlign: "center"}}>
        <Button htmlType="submit" type="primary" style={{background: "black", color: "white"}}>Add</Button>
      </Form.Item>
    </StyledForm>
  )
};

AddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  address: PropTypes.object
};
export default AddressForm;