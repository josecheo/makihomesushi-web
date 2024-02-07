import React from 'react';
import makihomeLogo from '../../assets/logo-makihome.svg'
import CartButton from '../cart';
import './header.css';
const Header: React.FC = () => {
    return (
        <header>
            <img src={makihomeLogo} alt="makihomesushi Logo" />
            <CartButton  />
        </header>
    );
};

export default Header;