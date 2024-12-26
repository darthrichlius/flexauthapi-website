import React from "react";
import styles from "./styles.module.css";

export const EndpointDetailsErrorNotDetails = () => (
  <p className={styles.endpointDetailsErrorNotDetails}>No more precision</p>
);

const EndpointDetailsError = ({ message, information }) => (
  <div>
    <p className={styles.endpointDetailsErrorMessage}>&gt; {message}</p>
    <p className={styles.endpointDetailsErrorInformation}>{information}</p>
  </div>
);

const EndpointDetailsErrorTable = ({ httpCode, errors }) => (
  <>
    {errors.map((errDetails, index) => (
      <EndpointDetailsError {...errDetails} />
    ))}
  </>
);

export default EndpointDetailsErrorTable;
