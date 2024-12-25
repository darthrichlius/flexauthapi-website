// src/components/EndpointDetails.tsx
import React from "react";
import DetailsTable, { TableRow } from "./EndpointDetailsTable";
import styles from "./styles.module.css";

interface EndpointDetailsProps {
  title: string;
  description?: string;
  endpoint: string;
  protected: boolean;
  parameters?: TableRow[];
  successResponseCode: number;
  successResponseBody: Record<string, any>;
  errors?: TableRow[];
}

const EndpointDetails = ({
  title,
  description,
  endpoint,
  protected: isProtected,
  parameters,
  successResponseCode,
  successResponseBody,
  errors,
}: EndpointDetailsProps) => (
  <div className={styles.endpointDetails}>
    <h2>{title}</h2>
    {description && <p>{description}</p>}

    <DetailsTable
      rows={[
        { key: "Endpoint", value: endpoint },
        { key: "Protected", value: isProtected ? "Yes" : "No" },
        {
          key: "Parameters",
          value: parameters ? <DetailsTable rows={parameters} /> : "None",
        },
        { key: "Success - Response Code", value: successResponseCode },
        {
          key: "Success - Response Body",
          value: <pre>{JSON.stringify(successResponseBody, null, 2)}</pre>,
        },
        {
          key: "Errors",
          value: errors ? <DetailsTable rows={errors} /> : "None",
        },
      ]}
    />
  </div>
);

export default EndpointDetails;
