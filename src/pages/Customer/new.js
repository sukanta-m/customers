import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { message, Spin } from "antd";
import CustomerForm from "./form";
import { createCustomerAction } from "../../modules/actions/customer";

const CreateCustomer = ({
  createCustomer,
  upserting,
  history
}) => {
  const onSave = (data) => {
    const date = new Date();
    const params = {
      ...data,
      createdAt: date,
      updatedAt: date
    }
    createCustomer(params).then(res => {
      message.success("Created successfully");
      history.push("/customers");
    });
  }

  return (
    <div>
      {upserting && <Spin/>}
      <h1>Create New customer</h1>
      <CustomerForm onSubmit={onSave}/>
    </div>
  )
};

CreateCustomer.defaultProps = {
  upserting: false
};

CreateCustomer.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  upserting: PropTypes.bool
};

export default connect(state => ({
  upserting: get(state, "customer.upserting", false)
}), {
  createCustomer: createCustomerAction
})(CreateCustomer);