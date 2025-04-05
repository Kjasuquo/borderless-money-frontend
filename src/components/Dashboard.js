import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const { userID } = useParams(); // Get userID from URL

    return (
        <div className="dashboard-container">
            <h2>Welcome to Your Wallet</h2>
            <p>User ID: {userID}</p>
            
            <div className="dashboard-buttons">
                <button onClick={() => navigate(`/deposit/${userID}`)}>Deposit Funds</button>
                <button onClick={() => navigate(`/swap/${userID}`)}>Swap Currency</button>
                <button onClick={() => navigate(`/transfer/${userID}`)}>Transfer Funds</button> 
                <button onClick={() => navigate(`/wallet/${userID}`)}>View Wallets</button>
                <button onClick={() => navigate(`/transactions/${userID}`)}>View Transactions</button>
            </div>
        </div>
    );
}

export default Dashboard;

