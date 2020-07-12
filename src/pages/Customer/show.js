import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { get } from "lodash";
import { Spin, PageHeader, Descriptions } from "antd";
import { fetchCustomerAction } from "../../modules/actions/customer";
import AddressTable from "../Address/AddressTable";

const CustomerDetails = ({
  fetchCustomer,
  customers,
  match,
  fetching,
  history
}) => {
  const { id } = match.params;

  useEffect(() => {
    if (!customers.length) {
      fetchCustomer(id);
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [id]);

  const customer = customers.find(p => p.id === parseInt(id, 10));

  if (fetching || !customer) {
    return <Spin/>;
  }
  
  const renderContent = (column = 2) => (
    <Descriptions size="large" column={column}>
      <Descriptions.Item label="Age">{customer.age}</Descriptions.Item>
      <Descriptions.Item label="Angular">
        {customer.angular}
      </Descriptions.Item>
    </Descriptions>
  );
  
  const Content = ({ children }) => {
    return (
      <div className="content">
        <div className="main">{children}</div>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        onBack={history.goBack}
        title={customer.name}
      >
        <Content>{renderContent()}</Content>
        <AddressTable
          customerId={id}
        />
      </PageHeader>
    </div>
  )
};

CustomerDetails.defaultProps = {
  fetching: false
};

CustomerDetails.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
  fetching: PropTypes.bool,
  fetchCustomer: PropTypes.func.isRequired
};

export default connect(state => ({
  customers: get(state, "customer.lists", []),
  fetching: get(state, "customer.fetching", false)
}), {
  fetchCustomer: fetchCustomerAction
})(CustomerDetails);