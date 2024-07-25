import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './screens/WebPage/Header';
import HomeContainer from './screens/WebPage/HomeContainer';
import PartnerPanels from './screens/WebPage/PartnerPanels';
import AccountContainer from './screens/WebPage/AccountContainer';
import SupportContainer from './screens/WebPage/SupportContainer';
import ExtraContainer from './screens/WebPage/ExtraContainer';
import Footer from './screens/WebPage/Footer';
import Login from './screens/CustomerJourneys/Login/Login';
import SignUp from './screens/CustomerJourneys/SignUp/SignUp';
import PersonalPanel from './screens/WebPage/PersonalPanel';
import BusinessPanel from './screens/WebPage/BusinessPanels';
import AccountsPanel from './screens/WebPage/AccountsPanel';
import SupportPanels from './screens/WebPage/SupportPanels';
import EmailConfirmation from './screens/CustomerJourneys/SignUp/EmailConfirmation';
import DashboardPanel from './screens/Dashboard/DashboardPanel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HomeContainer />
                <PartnerPanels />
                <AccountContainer />
                <SupportContainer />
                <ExtraContainer />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirm/:email" element={<EmailConfirmation />} />
            <Route path="/personal" element={<PersonalPanel />} />
            <Route path="/business" element={<BusinessPanel />} />
            <Route path="/accounts" element={<AccountsPanel />} />
            <Route path="/support" element={<SupportPanels />} />
            <Route path='/dashboard' element={<DashboardPanel />}/>
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
