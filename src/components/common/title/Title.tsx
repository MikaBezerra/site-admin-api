import React from "react";

import styles from './title.module.css';

interface TitleProps {
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ level, children }) => {
    const TagName = level;
    return <TagName className={styles.title}>{children}</TagName>;
};

export default Title;

