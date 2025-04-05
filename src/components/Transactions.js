import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import './Transactions.css';

function Transactions() {
    const { userID } = useParams();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`/transactions/${userID}`);
            setTransactions(response.data.transactions || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="transactions-container">
            <h2>TRANSACTIONS</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <div className="transactions-blocks">
                    {transactions.map((tx) => (
                        <div key={tx.id} className={`transaction-block ${tx.type?.toLowerCase() || ''}`}>
                            <div className="tx-header">
                                <span className="tx-type">{tx.type || 'Unknown'}</span>
                                <span className="tx-date">
                                    {tx.created_at ? new Date(tx.created_at).toLocaleString() : 'N/A'}
                                </span>
                            </div>
                            <div className="tx-body">
                                {tx.sender_id && (
                                    <div className="tx-detail">
                                        <strong>Sender:</strong> {tx.sender_id}
                                    </div>
                                )}
                                {tx.receiver_id && (
                                    <div className="tx-detail">
                                        <strong>Receiver:</strong> {tx.receiver_id}
                                    </div>
                                )}
                                {(tx.from_amount != null && tx.from_currency) && (
                                    <div className="tx-detail">
                                        <strong>From:</strong> {Number(tx.from_amount).toFixed(2)} {tx.from_currency}
                                    </div>
                                )}
                                {(tx.to_amount != null && tx.to_currency) && (
                                    <div className="tx-detail">
                                        <strong>To:</strong> {Number(tx.to_amount).toFixed(2)} {tx.to_currency}
                                    </div>
                                )}
                                {tx.conversion_rate != null && (
                                    <div className="tx-detail">
                                        <strong>Rate:</strong> {Number(tx.conversion_rate).toFixed(4)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="transactions-buttons">
                <button onClick={fetchTransactions} disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <button onClick={() => navigate(`/dashboard/${userID}`)}>Back to Dashboard</button>
            </div>
        </div>
    );
}

export default Transactions;
