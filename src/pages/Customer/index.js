import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { get, debounce } from "lodash";
import { Spin, Table, message, Popconfirm, Modal } from "antd";
import { PlusCircleOutlined, EditOutlined, RightCircleOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Search from "../sharedComponents/Search";

import { StyledActionsWrapper, StyledCreateWrapper } from "./style";
import { StyledWrapper } from "../sharedComponents/style";
import AddressTable from "../Address/AddressTable";
import AddressForm from "../Address/form";

import { fetchCustomersAction, deleteCustomerAction } from "../../modules/actions/customer";
import { createAddressAction } from "../../modules/actions/address";
import styled from "styled-components";

export const CustomerLists = ({
  fetchCustomers,
  fetching,
  customers,
  deleteCustomer,
  createAddress
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [addAddressCustomer, setAddAddressCustomer] = useState();

  useEffect(() => {
    fetchCustomers();
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, []);

  const handleCustomerDelete = id => {
    deleteCustomer(id).then(res => {
      message.success("Deleted successfully");
      fetchCustomers();
    })
  }

  const handleAddressSubmit = params => {
    createAddress(addAddressCustomer, params).then(res => {
      setAddAddressCustomer();
      message.success("Created successfully");
    });
  }

  const handleOpenAddressForm = (e, id) => {
    e.stopPropagation();
    setAddAddressCustomer(id);
  }

  const handleRowClick = id => setSelectedCustomer(id);

  const handleSearch = debounce(searchTxt => fetchCustomers(searchTxt), 1000);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: "50%"
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Angular',
      dataIndex: 'angular',
      key: 'angular'
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return <StyledActionsWrapper>
          <Link to="#" onClick={e => handleOpenAddressForm(e, record.id)}>
            <PlusCircleOutlined title="Add address" /> Address
          </Link>
          <Link to={`/customers/${record.id}`}>
            <RightCircleOutlined title="Show" />
          </Link>
          <Link to={`/customers/${record.id}/edit`}>
            <EditOutlined title="edit" />
          </Link>
          <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }}/>} onConfirm={() => handleCustomerDelete(record.id)}>
            <DeleteOutlined title="delete" />
          </Popconfirm>
        </StyledActionsWrapper>
      }
    },
  ];

  const customer = customers.find(c => c.id === selectedCustomer);

  return (
    <>
      <StyledCreateWrapper>
        <Link to="/customers/new">
          Add New Customer
          <PlusCircleOutlined />
        </Link>
        <Search onChange={handleSearch}/>
      </StyledCreateWrapper>
      <StyledWrapper>
        {fetching && <Spin/>}
        <StyledTable
          dataSource={customers}
          columns={columns}
          pagination={false}
          bordered
          rowKey="id"
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record.id)
            };
          }}
        />
      </StyledWrapper>
      {selectedCustomer && (
        <AddressTable
          customerId={selectedCustomer} 
          customer={customer}
        />
      )}
      {addAddressCustomer && (
        <Modal
          visible
          footer={false}
          title="Add Address"
          onCancel={() => setAddAddressCustomer()}
        >
          <AddressForm
            onSubmit={handleAddressSubmit}
          />
        </Modal>
      )}
    </>
  )
};

const StyledTable = styled(Table)`
  tbody tr {
    cursor: pointer;
  }
`;

PropTypes.defaultProps = {
  fetching: false,
  customers: []
};

CustomerLists.propTypes = {
  fetching: PropTypes.bool,
  customers: PropTypes.arrayOf(PropTypes.object),
  fetchCustomers: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired
};

export default connect((state) => ({
  fetching: get(state, "customer.fetching", false),
  customers: get(state, "customer.lists", [])
}), {
  fetchCustomers: fetchCustomersAction,
  deleteCustomer: deleteCustomerAction,
  createAddress: createAddressAction
})(CustomerLists);