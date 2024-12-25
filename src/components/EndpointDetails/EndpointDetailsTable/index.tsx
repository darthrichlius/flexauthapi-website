// src/components/DetailsTable.tsx
import React from "react";
import styles from "./styles.module.css";

export interface TableRow {
  key: string;
  value: React.ReactNode;
}

interface DetailsTableProps {
  rows: TableRow[];
}

const DetailsTable = ({ rows }: DetailsTableProps) => (
  <table className={styles.detailsTable}>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          <th>{row.key}</th>
          <td>{row.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DetailsTable;
