import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <header style={headerStyles}>
            <button style={buttonStyles} onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
}

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
};

const buttonStyles = {
    padding: '10px 15px',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

export default Header;
