import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Data from './Api/data.json';
import './app.scss';
import Sidebar from './components/Sidebar';
import Invoices from './components/Invoices';
import ViewInvoice from './components/ViewInvoice';

function App() {
  const [currentData, setCurrentData] = useState(Data);
  const [switchDarkLight, setSwitchDarkLight] = useState(false);
  const [invoice, setInvoice] = useState({});

  const viewInvoice = (id) => {
    const newData = currentData.filter((elem) => elem.id === id)[0];
    setInvoice(newData);
  };

  const toggleSwitch = () => {
    document.querySelector('body').classList.toggle('dark');
    setSwitchDarkLight(!switchDarkLight);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar switch={switchDarkLight} toggleswitch={toggleSwitch} />

        <Route
          path="/"
          exact
          component={() => (
            <Invoices
              data={currentData}
              setCurrentData={setCurrentData}
              viewInvoice={viewInvoice}
            />
          )}
        />
        <Route
          path="/detail/:id"
          exact
          component={() => (
            <ViewInvoice
              data={currentData}
              setCurrentData={setCurrentData}
              invoice={invoice}
              viewInvoice={viewInvoice}
            />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
