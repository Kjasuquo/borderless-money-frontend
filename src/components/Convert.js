import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import './Convert.css';

function Swap() {
    const { userID } = useParams();
    const navigate = useNavigate();
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSwap = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if ((fromAmount && toAmount) || (!fromAmount && !toAmount)) {
            setError('Please enter either "From Amount" or "To Amount", but not both.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`/convert/${userID}`, {
                from_currency: fromCurrency,
                to_currency: toCurrency,
                from_amount: fromAmount ? parseFloat(fromAmount) : undefined,
                to_amount: toAmount ? parseFloat(toAmount) : undefined,
            });

            setSuccessMessage(`Transaction Successful! Transaction ID: ${response.data.transactionID}`);

            setTimeout(() => {
                navigate(`/dashboard/${userID}`);
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Swap failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="swap-container">
            <h2>Swap Currency</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="swap-form">
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="">Select From Currency</option>
                    <option value="cUSD">cUSD</option>
                    <option value="cEUR">cEUR</option>
                    <option value="cNGN">cNGN</option>
                    <option value="cXAF">cXAF</option>
                </select>

                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    <option value="">Select To Currency</option>
                    <option value="cUSD">cUSD</option>
                    <option value="cEUR">cEUR</option>
                    <option value="cNGN">cNGN</option>
                    <option value="cXAF">cXAF</option>
                </select>

                <input
                    type="number"
                    placeholder="From Amount"
                    value={fromAmount}
                    onChange={(e) => {
                        setFromAmount(e.target.value);
                        setToAmount('');
                    }}
                    disabled={toAmount !== ''}
                />

                <input
                    type="number"
                    placeholder="To Amount"
                    value={toAmount}
                    onChange={(e) => {
                        setToAmount(e.target.value);
                        setFromAmount('');
                    }}
                    disabled={fromAmount !== ''}
                />

                <button onClick={handleSwap} disabled={loading}>
                    {loading ? 'Swapping...' : 'Swap'}
                </button>
                <button onClick={() => navigate(`/dashboard/${userID}`)}>Back to Dashboard</button>
            </div>
        </div>
    );
}

export default Swap;

// T1rU2ZCZ1CDnPh
// Website for borderless-money.wuaze.com
// if0_38680746
