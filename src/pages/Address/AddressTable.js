import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table, Spin } from "antd";
import { get } from "lodash";
import PropTypes from 'prop-types';
import { StyledWrapper } from "../sharedComponents/style";

import { fetchAddresssAction } from "../../modules/actions/address";

const AddressTable = ({
  customerId,
  addresses,
  fetchCustomerAddress,
  fetching,
  customer
}) => {
  useEffect(() => {
    fetchCustomerAddress(customerId);
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [customerId]);

  const columns = [
    {
      title: 'Street1',
      dataIndex: 'street1',
      key: 'street1'
    },
    {
      title: 'Street2',
      dataIndex: 'street1',
      key: 'street1'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: 'Postal code',
      dataIndex: 'pin',
      key: 'pin'
    }
  ];

  return (
    <StyledWrapper>
      {fetching && <Spin/>}
      {customer ? <h1>Addresses of <b>{customer.name}</b></h1> : <h1>Addresses</h1>}
      <Table
        dataSource={addresses}
        columns={columns}
        pagination={false}
        bordered
        rowKey="id"
      />
    </StyledWrapper>
  )
};

PropTypes.defaultProps = {
  fetching: false,
  addresses: []
};

AddressTable.propTypes = {
  fetching: PropTypes.bool,
  addresses: PropTypes.arrayOf(PropTypes.object),
  fetchAddresses: PropTypes.func.isRequired
};

export default connect((state) => ({
  fetching: get(state, "address.fetching", false),
  addresses: get(state, "address.lists", [])
}), {
  fetchCustomerAddress: fetchAddresssAction
})(AddressTable);