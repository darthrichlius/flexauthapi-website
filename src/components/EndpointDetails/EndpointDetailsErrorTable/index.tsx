import React from "react";
import styles from "./styles.module.css";

const EndpointDetailsError = ({ name, description }) => (
  <p className={styles.endpointDetailsError}>
    <code className={styles.endpointDetailsErrorName}>{name}</code>
    <span className={styles.endpointDetailsErrorDesc}> {description}</span>
  </p>
);

const EndpointDetailsErrorTable = ({ rows }) => (
  <>
    {rows.map((row, index) => (
      <EndpointDetailsError {...row} />
    ))}
  </>
);

export default EndpointDetailsErrorTable;
