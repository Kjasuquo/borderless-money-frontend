import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

function CreateWallet() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateWallet = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/create-wallet', { email });
            console.log("userID: ", response.data);
            console.log("userID: ", response);
            
            navigate(`/dashboard/${response.data.userID}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Cannot Retrieve Your Wallet');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Looking For A Way To Send And Receive Money?</h2>
            
            {error && <p style={styles.error}>{error}</p>}

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleCreateWallet} disabled={loading} style={styles.button}>
                {loading ? 'Creating...' : 'Retrieve Your Wallet'}
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
    input: {
        width: '300px',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        width: '300px',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

export default CreateWallet;
