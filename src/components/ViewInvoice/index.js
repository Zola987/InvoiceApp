import { Link, useParams, useHistory } from 'react-router-dom';
import { formatDate, formatPrice } from '../Helpers';
import Back from '../../assets/svg/icon-arrow-left.svg';
import DeleteItem from '../../assets/svg/icon-delete.svg';
import AddNewItem from '../../assets/svg/icon-plus.svg';
import './viewInvoices.scss';

function ViewInvoice(props) {
  //current Data
  const currentData = [...props.data];
  const invoice = props.invoice;
  const { id } = useParams();
  const history = useHistory();
  window.onload = () => {
    props.viewInvoice(history.location.pathname.split('/')[2]);
  };

  const handleChange = (ev, elem) => {
    if (elem === 'clientAddress') {
      console.log(elem);
    } else if (elem === '') {
      console.log(ev);
    } else if (elem === 'senderAddress') {
      console.log(ev);
    }
  };

  const Submit = (ev) => {
    ev.preventDefault();
    props.setCurrentData(currentData);
    toggleDisplayEdit();
    history.push('/');
  };

  const markAs = () => {
    if (invoice.status === 'paid') {
      invoice.status = 'draft';
    } else if (invoice.status === 'pending') {
      invoice.status = 'paid';
    }
    props.setCurrentData(currentData);
    history.push('/');
  };

  const Delete = () => {
    const NewData = currentData.filter((elem) => elem.id !== id);
    props.setCurrentData(NewData);
    toggleDisplayEdit();
    history.push('/');
  };

  const togglePrompt = () => {
    document.querySelector('.popupdelete').classList.toggle('display');
  };

  //RenderPropmt delete

  const PopupDelete = () => {
    return (
      <div className="popupdelete">
        <div className="box-delete">
          <h2>Confirm Deletion</h2>
          <p className="description">
            Are you sure you want to delete invoice {id}? this action cannot be
            undone
          </p>
          <div className="box-button">
            <button className="btn delete-non" onClick={togglePrompt}>
              Cancel
            </button>
            <button className="btn delete-yes" onClick={Delete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RenderInvoiceContent = () => {
    if (invoice.id === id) {
      return (
        <div className="invoice-content">
          <div className="header-invoice-information row justify-content-between">
            <div className="commande-number">
              <h3>
                <span>#</span>
                {invoice.id}
              </h3>
              <p className="body1">{invoice.description}</p>
            </div>
            <div className="adress-information">
              <p className="body2 adress-number">
                {invoice.senderAddress.street}
              </p>
              <p className="body2 town">{invoice.senderAddress.city}</p>
              <p className="code body2">{invoice.senderAddress.postCode}</p>
              <p className="body2 country">{invoice.senderAddress.country}</p>
            </div>
          </div>
          <div className="invoice-information row justify-content-between">
            <div className="information-date">
              <p className="body1">Invoice Date</p>
              <h3 className="invoice-date">{formatDate(invoice.createdAt)}</h3>
              <p className="body1">Payment Due</p>
              <h3>{formatDate(invoice.paymentDue)}</h3>
            </div>

            <div className="information-bill">
              <p className="body1">Bill To</p>
              <h3 className="name">{invoice.clientName}</h3>
              <p className="body2">{invoice.clientAddress.street}</p>
              <p className="body2">{invoice.clientAddress.city}</p>
              <p className="body2">{invoice.clientAddress.postCode}</p>
              <p className="body2">{invoice.clientAddress.country}</p>
            </div>

            <div className="information-email">
              <p className="body1">Sent to</p>
              <h3>{invoice.clientEmail}</h3>
            </div>
          </div>

          <div className="bill-content">
            <div className="header-bill-content row justify-content-between">
              <p className="body1 flex-50 color">Item Name</p>
              <div className="information-price flex-50 row justify-content-between">
                <p className="body1 color">QTY</p>
                <p className="Price color">Price</p>
                <p className="Total color">Total</p>
              </div>
            </div>

            <div className="bill-content-items">
              {invoice.items.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className="bill-content-item row justify-content-between"
                  >
                    <h3 className="bill-name flex-50">{elem.name}</h3>
                    <div className="information-price flex-50 row justify-content-between">
                      <h3 className="bill-qty">{elem.quantity}</h3>
                      <h3 className="bill-price">
                        £ {formatPrice(elem.price)}
                      </h3>
                      <h3 className="bill-total">
                        £ {formatPrice(elem.total)}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="total-price row align-items-center justify-content-between">
            <p className="body2">Amount Due</p>
            <h1>£ {formatPrice(invoice.total)}</h1>
          </div>
        </div>
      );
    } else {
      return '';
    }
  };

  //Edit

  const toggleDisplayEdit = () => {
    document.querySelector('.edit-form-page').classList.toggle('display');
  };

  const Edit = () => {
    if (invoice.id === id) {
      return (
        <div className="edit-form-page">
          <div className="edit-form-content">
            <div className="header-edit-form">
              <h2>
                Edit <span>#</span>
                {invoice.id}
              </h2>
            </div>

            <div className="bill-form">
              <form onSubmit={Submit}>
                <h3 className="two">Bill From</h3>
                <div className="data-control">
                  <label className="body1">Street Address</label>
                  <input
                    type="text"
                    defaultValue={invoice.clientAddress.street}
                    name="street"
                    onChange={(ev) => handleChange(ev, 'clientAddress')}
                  />
                </div>
                <div className="data-control row justify-content-between ">
                  <div className="data-input">
                    <label className="body1">City</label>
                    <input
                      type="text"
                      defaultValue={invoice.clientAddress.city}
                      name="city"
                      onChange={(ev) => handleChange(ev, 'clientAddress')}
                    />
                  </div>

                  <div className="data-input">
                    <label className="body1">Post Code</label>
                    <input
                      type="text"
                      defaultValue={invoice.clientAddress.postCode}
                      name="postCode"
                      onChange={(ev) => handleChange(ev, 'clientAddress')}
                    />
                  </div>

                  <div className="data-input">
                    <label className="body1">Country</label>
                    <input
                      type="text"
                      defaultValue={invoice.clientAddress.country}
                      name="country"
                      onChange={(ev) => handleChange(ev, 'clientAddress')}
                    />
                  </div>
                </div>

                <h3 className="two margin-48">Bill To</h3>
                <div className="data-control">
                  <label className="body1">Client's name</label>
                  <input
                    type="text"
                    defaultValue={invoice.clientName}
                    name="clientName"
                    onChange={(ev) => handleChange(ev, '')}
                  />
                </div>
                <div className="data-control">
                  <label className="body1">Street adress</label>
                  <input
                    type="text"
                    defaultValue={invoice.senderAddress.street}
                    name="street"
                    onChange={(ev) => handleChange(ev, 'senderAddress')}
                  />
                </div>
                <div className="data-control row justify-content-between">
                  <div className="data-input">
                    <label className="body1">City</label>
                    <input
                      type="text"
                      defaultValue={invoice.senderAddress.city}
                      name="city"
                      onChange={(ev) => handleChange(ev, 'senderAddress')}
                    />
                  </div>

                  <div className="data-input">
                    <label className="body1">Post Code</label>
                    <input
                      type="text"
                      defaultValue={invoice.senderAddress.postCode}
                      name="postCode"
                      onChange={(ev) => handleChange(ev, 'senderAddress')}
                    />
                  </div>

                  <div className="data-input">
                    <label className="body1">Country</label>
                    <input
                      type="text"
                      defaultValue={invoice.senderAddress.country}
                      name="country"
                      onChange={(ev) => handleChange(ev, 'senderAddress')}
                    />
                  </div>
                </div>

                <div className="data-control row justify-content-between">
                  <div className="date-control">
                    <label className="body1">Invoice Date</label>
                    <input
                      type="date"
                      defaultValue={invoice.createdAt}
                      name="createdAt"
                      onChange={(ev) => handleChange(ev, '')}
                    />
                  </div>
                  <div className="payement-terms">
                    <label className="body1">Payement terms</label>
                    <input
                      type="date"
                      defaultValue={invoice.paymentDue}
                      name="paymentDue"
                      onChange={(ev) => handleChange(ev, '')}
                    />
                  </div>
                </div>

                <div className="data-control">
                  <label className="body1">Project description</label>
                  <input
                    type="text"
                    defaultValue={invoice.description}
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
                  {invoice.items.map((elem, index) => {
                    return (
                      <div
                        key={index}
                        className="list-item row justify-content-between"
                      >
                        <input
                          className="item-name"
                          type="text"
                          defaultValue={elem.name}
                        />
                        <div className="price-control row justify-content-between align-items-center">
                          <input
                            className="item-qty"
                            type="text"
                            defaultValue={elem.quantity}
                          />
                          <input
                            className="item-price"
                            type="number"
                            defaultValue={elem.price}
                          />
                          <div className="total-price">{elem.total}</div>
                          <div className="delete-button">
                            <img src={DeleteItem} alt="delete" />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="button-add-item center">
                    <img src={AddNewItem} alt="delete" />
                    <span> Add new item</span>
                  </div>
                  <div className="btn-control-edit">
                    <button
                      className="btn cancel-btn"
                      onClick={toggleDisplayEdit}
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
    } else {
      return '';
    }
  };

  const ControlNav = () => {
    return (
      <div className="nav-edit-invoice row align-items-center justify-content-between">
        <div className="content-status row align-items-center justify-content-between">
          <p className="body1">Status</p>
          <h3
            className={`status ${
              invoice.status === 'paid'
                ? 'paid'
                : invoice.status === 'draft'
                ? 'draft'
                : 'pending'
            } center`}
          >
            {invoice.status}
          </h3>
        </div>
        <div
          className={`control-invoice row align-items-center justify-content-between ${
            invoice.status === 'draft' ? 'none' : ''
          }`}
        >
          <button className="btn edit center" onClick={toggleDisplayEdit}>
            Edit
          </button>
          <button className="btn delete center" onClick={togglePrompt}>
            Delete
          </button>
          <button
            className={`btn mark-as center ${
              invoice.status === 'draft' ? 'none' : ''
            }`}
            onClick={() => markAs(invoice.status)}
          >{`Mark as ${
            invoice.status === 'pending'
              ? 'paid'
              : invoice.status === 'paid'
              ? 'draft'
              : ''
          }`}</button>
        </div>
      </div>
    );
  };

  return (
    <div className="view-invoice ">
      <Edit />
      <PopupDelete />

      <div className="content-view-invoice container padding-top-72">
        <Link
          to="/"
          className="go-back-content row align-items-center justify-content-between"
        >
          <img src={Back} alt="Go back" />
          <h3>Go back</h3>
        </Link>

        {invoice === [] ? '' : <ControlNav />}
        {invoice === [] ? '' : <RenderInvoiceContent />}
      </div>
    </div>
  );
}

export default ViewInvoice;
