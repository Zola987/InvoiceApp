import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { formatDate, formatPrice } from '../Helpers';
import ArrowDown from '../../assets/svg/icon-arrow-down.svg';
import Add from '../../assets/svg/icon-plus.svg';
import Display from '../../assets/svg/icon-arrow-right.svg';
import DeleteItem from '../../assets/svg/icon-delete.svg';
import EmptyPageInfo from '../../assets/svg/illustration-empty.svg';
import './invoices.scss';

function Invoices(props) {
  //current Data
  const currentData = [...props.data];
  const addElem = {
    clientAdress: { street: '', city: '', postCode: '', country: '' },
    clientEmail: '',
    clientName: '',
    createdAt: '',
    description: '',
    id: '',
    items: [],
    paymentDue: '',
    senderAdress: { street: '', city: '', postCode: '', country: '' },
    status: '',
    total: '',
  };

  const [data, setData] = useState(currentData);
  const [newElem, setNewElem] = useState(addElem);

  // On submit
  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (ev.cancelable) {
      const newData = [newElem, ...props.data];
      props.setCurrentData(newData);
      setNewElem(addElem);
    }
  };

  //Handle Input Change
  const handleChange = (ev, elem) => {
    if (elem === 'clientAddress') {
      newElem.clientAdress[ev.target.name] = ev.target.value;
    } else if (elem === '') {
      newElem[ev.target.name] = ev.target.value;
    } else if (elem === 'senderAddress') {
      newElem.senderAdress[ev.target.name] = ev.target.value;
    }
  };

  //Toggle Form
  const toggleDisplayAdd = () => {
    document.querySelector('.edit-form-page').classList.toggle('display');
  };

  // Render Header
  const RenderHeader = () => {
    return (
      <div className="heading">
        <h1>Invoices</h1>
        <p className="body1 heading-sous-title">
          There are {currentData.length} total Invoices
        </p>
      </div>
    );
  };

  //Filter Data

  const Filter = (filterby) => {
    if (filterby === 'paid') {
      const newData = currentData.filter((elem) => elem.status === filterby);

      setData(newData);
    } else if (filterby === 'draft') {
      const newData = currentData.filter((elem) => elem.status === filterby);

      setData(newData);
    } else if (filterby === 'pending') {
      const newData = currentData.filter((elem) => elem.status === filterby);
      setData(newData);
    } else if (filterby === 'all') {
      setData(currentData);
    }
  };

  //RenderFilter & Function
  const toggleselect = (selectelem) => {
    document.querySelector('.data-select').classList.toggle('active');
    document.querySelector('.select-elemnt').innerHTML = selectelem;
    Filter(selectelem);
  };

  const RenderFilter = () => {
    return (
      <div className="filter-add-content row align-items-center">
        <div className="select">
          <div
            className="selected-style row align-items-center justify-content-between"
            onClick={() => toggleselect('Filter by status')}
          >
            <h3 className="two select-elemnt">Filter by status</h3>

            <img src={ArrowDown} alt="select" width="9" />
          </div>
          <ul className="data-select">
            <li onClick={() => toggleselect('all')}>All</li>
            <li onClick={() => toggleselect('paid')}>Paid</li>
            <li onClick={() => toggleselect('pending')}>Pending</li>
            <li onClick={() => toggleselect('draft')}>Draft</li>
          </ul>
        </div>

        <div
          className="add-new-invoice row align-items-center"
          onClick={ToggleEddNewInvoice}
        >
          <div className="box-add-icon center">
            <img src={Add} alt="add item" width="10" />
          </div>

          <h3 className="two">New Invoice</h3>
        </div>
      </div>
    );
  };

  //Render Header + filter + Add
  const NavHeader = ({ data, setData }) => {
    return (
      <div className="nav-filter ">
        <div className="filter-invoices row align-items-center justify-content-between">
          <RenderHeader />
          <RenderFilter />
        </div>
        <div className="list-invoices"></div>
      </div>
    );
  };

  // Render List Invoices Eement
  const RenderInvoices = () => {
    return (
      <div className="content-lists">
        {data.map((elem, index) => {
          return (
            <div key={index} className="content-item row">
              <div className="date-price-info row align-items-center">
                <h3 className="commande-number">
                  <span>#</span>
                  {elem.id}
                </h3>
                <p className="body1 date">
                  <span>Due</span> {formatDate(elem.paymentDue)}
                </p>
              </div>
              <div
                style={{ width: '252px' }}
                className="row align-items-center justify-content-between"
              >
                <p className="body1 fullName">{elem.clientName}</p>
                <h3 className="total-price">£ {formatPrice(elem.total)}</h3>
              </div>

              <div className="paid-link row justify-content-between justify-content-between align-items-center">
                <div
                  className={`status ${
                    elem.status === 'paid'
                      ? 'paid'
                      : elem.status === 'pending'
                      ? 'pending'
                      : 'draft'
                  } center`}
                >
                  <h3 className="two command-status">{elem.status}</h3>
                </div>
                <NavLink
                  to={`/detail/${elem.id}`}
                  onClick={() => props.viewInvoice(elem.id)}
                >
                  <img src={Display} alt="Display" />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const RenderInvoicesEmptyPage = () => {
    return (
      <div className="invoices-empty-page">
        <div className="content-empty-page">
          <div className="box-empty-page-info-img">
            <img src={EmptyPageInfo} alt="Empty page info" />
          </div>
          <div className="description-info">
            <h2>There is nothing here</h2>
            <p className="body2 description-paragraph">
              Create an invoice by clicking the
              <span className="two"> New Invoice</span> button and get started
            </p>
          </div>
        </div>
      </div>
    );
  };

  //Add New- Invoice

  const ToggleEddNewInvoice = () => {
    document.querySelector('.edit-form-page').classList.toggle('display');
  };
  const AddNewInvoice = () => {
    return (
      <div className="edit-form-page">
        <div className="edit-form-content">
          <div className="header-edit-form">
            <h2>New Invoice</h2>
          </div>

          <div className="bill-form">
            <form onSubmit={handleSubmit}>
              <h3 className="two">Bill From</h3>
              <div className="data-control">
                <label className="body1">Street Address</label>
                <input
                  type="text"
                  title="Street Adress"
                  name="street"
                  onChange={(ev) => handleChange(ev, 'senderAddress')}
                />
              </div>
              <div className="data-control row justify-content-between ">
                <div className="data-input">
                  <label className="body1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={(ev) => handleChange(ev, 'senderAddress')}
                  />
                </div>

                <div className="data-input">
                  <label className="body1">Post Code</label>
                  <input
                    type="text"
                    placeholder="Post Code"
                    name="postCode"
                    onChange={(ev) => handleChange(ev, 'senderAddress')}
                  />
                </div>

                <div className="data-input">
                  <label className="body1">Country</label>
                  <input
                    type="text"
                    placeholder="country"
                    name="Country"
                    onChange={(ev) => handleChange(ev, 'senderAddress')}
                  />
                </div>
              </div>

              <h3 className="two margin-48">Bill To</h3>
              <div className="data-control">
                <label className="body1">Client's name</label>
                <input
                  type="text"
                  placeholder="Client's Name"
                  name="clientName"
                  onChange={(ev) => handleChange(ev, '')}
                />
              </div>
              <div className="data-control">
                <label className="body1">Street adress</label>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  onChange={(ev) => handleChange(ev, 'clientAddress')}
                />
              </div>
              <div className="data-control row justify-content-between">
                <div className="data-input">
                  <label className="body1">City</label>
                  <input
                    type="text"
                    placeholder="city"
                    name="city"
                    onChange={(ev) => handleChange(ev, 'clientAddress')}
                  />
                </div>

                <div className="data-input">
                  <label className="body1">Post Code</label>
                  <input
                    type="text"
                    placeholder="post code"
                    name="postCode"
                    onChange={(ev) => handleChange(ev, 'clientAddress')}
                  />
                </div>

                <div className="data-input">
                  <label className="body1">Country</label>
                  <input
                    type="text"
                    name="country"
                    onChange={(ev) => handleChange(ev, 'clientAddress')}
                  />
                </div>
              </div>

              <div className="data-control row justify-content-between">
                <div className="date-control">
                  <label className="body1">Invoice Date</label>
                  <input
                    type="date"
                    name="createdAt"
                    onChange={(ev) => handleChange(ev, '')}
                  />
                </div>
                <div className="payement-terms">
                  <label className="body1">Payement terms</label>
                  <input
                    type="date"
                    name="paymentDue"
                    onChange={(ev) => handleChange(ev, '')}
                  />
                </div>
              </div>

              <div className="data-control">
                <label className="body1">Project description</label>
                <input
                  type="text"
                  name="description"
                  onChange={(ev) => handleChange(ev, '')}
                />
              </div>

              <div className="list-items">
                <h2 className="item-list-header">Item list</h2>
                <div className="list-items-header row justify-content-between">
                  <p className="item-name">Item name</p>
                  <div className="price-control row justify-content-between">
                    <p className="body1 item-qty">Qty</p>
                    <p className="body1 item-price">Price</p>
                    <p className="body1 total-price">Total</p>
                    <div className="delete-button"></div>
                  </div>
                </div>

                <div className="list-item row justify-content-between">
                  <input className="item-name" type="text" />
                  <div className="price-control row justify-content-between align-items-center">
                    <input className="item-qty" type="text" />
                    <input className="item-price" type="number" />
                    <div className="total-price"></div>
                    <div className="delete-button">
                      <img src={DeleteItem} alt="delete" />
                    </div>
                  </div>
                </div>

                <div className="button-add-item center">
                  <img src={Add} alt="delete" />
                  <span> Add new item</span>
                </div>
                <div className="btn-control-edit">
                  <button
                    className="btn cancel-btn"
                    type="button"
                    onClick={toggleDisplayAdd}
                  >
                    Cancel
                  </button>
                  <button className="btn save-btn" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="invoices-pages">
      <AddNewInvoice />
      <div className="invoices padding-top-72">
        <div className="content-invoices container">
          <NavHeader />
          {data ? <RenderInvoices /> : <RenderInvoicesEmptyPage />}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
