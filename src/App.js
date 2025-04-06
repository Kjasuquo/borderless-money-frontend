import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import CreateWallet from './components/PostWallet';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
import Swap from './components/Convert';
import Transfer from './components/Transfer';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import Header from './components/Header';

function AppContent() {
    const location = useLocation();
    const showHeader = location.pathname !== '/';

    return (
        <>
            {showHeader && <Header />}
            <div style={{ marginTop: showHeader ? '70px' : '0' }}>
                <Routes>

                    <Route path="/" element={<CreateWallet />} />
                    <Route path="/dashboard/:userID" element={<Dashboard />} />
                    <Route path="/swap/:userID" element={<Swap />} />
                    <Route path="/deposit/:userID" element={<Deposit />} />
                    <Route path="/transactions/:userID" element={<Transactions />} />
                    <Route path="/transfer/:userID" element={<Transfer />} />
                    <Route path="/wallet/:userID" element={<Wallet />} />
                </Routes>
            </div>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
