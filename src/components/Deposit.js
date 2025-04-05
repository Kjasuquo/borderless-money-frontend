import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import './Deposit.css';

function Deposit() {
    const { userID } = useParams();
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('cUSD');
    const [loading, setLoading] = useState(false);
    const [transactionID, setTransactionID] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDeposit = async () => {
        setLoading(true);
        setError('');
        setTransactionID(null);

        try {
            const response = await axios.post(`/deposit/${userID}`, { amount: parseFloat(amount), currency });
            setTransactionID(response.data.transactionID);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deposit-container">
            <h2>Deposit Funds</h2>
            {error && <p className="error-message">{error}</p>}

            {transactionID ? (
                <div className="success-message">
                    <p>✅ Transaction Successful!</p>
                    <p>Transaction ID: {transactionID}</p>
                    <button onClick={() => navigate(`/dashboard/${userID}`)}>Back to Dashboard</button>
                </div>
            ) : (
                <div className="deposit-form">
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="cUSD">cUSD</option>
                        <option value="cEUR">cEUR</option>
                        <option value="cNGN">cNGN</option>
                        <option value="cXAF">cXAF</option>
                    </select>
                    <button onClick={handleDeposit} disabled={loading}>
                        {loading ? 'Processing...' : 'Deposit'}
                    </button>
                    <button onClick={() => navigate(`/dashboard/${userID}`)}>Back to Dashboard</button>
                </div>
            )}
        </div>
    );
}

export default Deposit;

