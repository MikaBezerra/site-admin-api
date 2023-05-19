import React from 'react';

import styles from './header.module.css';
import Title from '../../common/title/Title';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Title level='h1'>Dashboard do seu site pessoal</Title>
            </div>
        </header>
    );
};

export default Header;