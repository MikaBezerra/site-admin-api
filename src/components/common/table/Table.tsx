import React from "react";

import styles from './table.module.css';

interface TableProps<T> {
  data: T[];
  columns: string[];
  renderRow: (item: T, index: number) => React.ReactNode;
}

const Table = <T,>({ data, columns, renderRow }: TableProps<T>) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>{renderRow(item, index)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;


