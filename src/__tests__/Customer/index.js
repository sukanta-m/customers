import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {CustomerLists} from '../../pages/Customer/index';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

const customers = [
  {
    "name": "SUkanta Mangal",
    "age": 32,
    "angular": "male",
    "createdAt": "2020-07-12T05:00:55.954Z",
    "updatedAt": "2020-07-12T05:05:07.467Z",
    "id": 1
  }
];

describe('CustomerList', () => {
  const props = {
    fetchCustomers: jest.fn(),
    deleteCustomer: jest.fn(),
    createAddress: jest.fn()
  };

  it('should render correctly', () => {
    const component = mount(<MemoryRouter><CustomerLists customers={customers} {...props}/></MemoryRouter>);
    expect(component.find("CustomerLists")).not.toBeNull();
  });
});