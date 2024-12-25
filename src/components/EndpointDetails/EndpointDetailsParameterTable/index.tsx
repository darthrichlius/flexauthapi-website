import React from "react";
import styles from "./styles.module.css";
import { type EndpointParameterProps } from "..";

interface EndpointDetailsParameterTablePros {
  rows: EndpointParameterProps[];
}

const EndpointDetailsParameter = ({ name, isRequired, description, type }) => (
  <p className={styles.endpointDetailsParameter}>
    <code className={styles.endpointDetailsParameterName}>{name}</code>
    <span>
      ({type}, {isRequired ? "required" : "optional"})
    </span>
    <span className={styles.endpointDetailsParameterDesc}>- {description}</span>
  </p>
);

const EndpointDetailsParameterTable = ({
  rows,
}: EndpointDetailsParameterTablePros) => (
  <>
    {rows.map((row, index) => (
      <EndpointDetailsParameter {...row} />
    ))}
  </>
);

export default EndpointDetailsParameterTable;
