import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { Spin, message } from "antd";
import CustomerForm from "./form";
import { updateCustomerAction, fetchCustomerAction } from "../../modules/actions/customer";

const UpdateCustomer = ({
  updateCustomer,
  fetchCustomer,
  customers,
  match,
  fetching,
  upserting,
  history
}) => {
  const { id } = match.params;
  const customer = customers.find(p => p.id === parseInt(id, 10));

  useEffect(() => {
    if (!customers.length) {
      fetchCustomer(id);
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [id]);

  const onUpdate = (data) => {
    const params = {
      ...customer,
      ...data,
      updatedAt: new Date()
    }
    updateCustomer(id, params).then(response => {
      message.success("Updated successfully");
      history.push(`/customers/${id}`);
    });
  }
  
  if (fetching || !customer) {
    return <Spin/>;
  }

  return (
    <div>
      {upserting && <Spin/>}
      <h1>Edit <b>{customer.name}</b></h1>
      <CustomerForm onSubmit={onUpdate} customer={customer}/>
    </div>
  )
};

UpdateCustomer.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
  fetching: PropTypes.bool,
  upserting: PropTypes.bool
};

UpdateCustomer.defaultProps = {
  customers: [],
  fetching: false,
  upserting: false
};

export default connect(state => ({
  customers: get(state, "customer.lists", []),
  fetching: get(state, "customer.fetching", false),
  upserting: get(state, "customer.upserting", false)
}), {
  updateCustomer: updateCustomerAction,
  fetchCustomer: fetchCustomerAction
})(UpdateCustomer);