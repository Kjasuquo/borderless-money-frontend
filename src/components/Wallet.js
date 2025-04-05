import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import './Wallet.css'; 
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#b57edc', '#ff6b6b'];

function Wallet() {
    const { userID } = useParams();
    const navigate = useNavigate();
    const [wallets, setWallets] = useState([]);
    const [totalUSDBalance, setTotalUSDBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchWallets = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`/wallet/${userID}`);
            setWallets(response.data.user.Wallets);
            setTotalUSDBalance(response.data.user.totalUSDBalance);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load wallets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <div className="wallet-container">
            <h2>Your Wallets</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="wallet-box">
                        <h3>Total USD Balance: ${totalUSDBalance.toFixed(2)}</h3>
                        <ul className="wallet-list">
                            {wallets.map((wallet) => (
                                <li key={wallet.currency}>
                                    <strong>{wallet.currency}:</strong> {wallet.balance.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="wallet-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={wallets}
                                    dataKey="balance"
                                    nameKey="currency"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {wallets.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            <div className="wallet-buttons">
                <button onClick={fetchWallets} disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <button onClick={() => navigate(`/dashboard/${userID}`)}>Back to Dashboard</button>
            </div>
        </div>
    );
}

export default Wallet;
