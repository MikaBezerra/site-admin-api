import React from 'react';

import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';

import styles from './layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.main}>
                <Sidebar></Sidebar>
                <div className={styles.content}>{children}</div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;