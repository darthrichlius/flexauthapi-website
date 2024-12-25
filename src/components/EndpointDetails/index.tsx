// src/components/EndpointDetails.tsx
import React from "react";
import DetailsTable from "./EndpointDetailsTable";
import styles from "./styles.module.css";
import EndpointDetailsParameterTable from "./EndpointDetailsParameterTable";
import EndpointDetailsErrorTable from "./EndpointDetailsErrorTable";

export interface EndpointParameterProps {
  name: string;
  isRequired: boolean;
  type: string;
  description: string;
}

export interface EndpointErrorProps {}

interface EndpointDetailsProps {
  title: string;
  description?: string;
  endpoint: string;
  protected: boolean;
  parameters?: EndpointParameterProps[];
  successResponseCode: number;
  successResponseBody: Record<string, any>;
  errors?: EndpointErrorProps[];
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
    <h4>{title}</h4>
    {description && <p>{description}</p>}

    <DetailsTable
      rows={[
        { key: "Endpoint", value: endpoint },
        { key: "Protected", value: isProtected ? "Yes" : "No" },
        {
          key: "Parameters",
          value: parameters ? (
            <EndpointDetailsParameterTable rows={parameters} />
          ) : (
            "None"
          ),
        },
        { key: "Success - Response Code", value: successResponseCode },
        {
          key: "Success - Response Body",
          value: <pre>{JSON.stringify(successResponseBody, null, 2)}</pre>,
        },
        {
          key: "Errors",
          value: errors ? <EndpointDetailsErrorTable rows={errors} /> : "None",
        },
      ]}
    />
  </div>
);

export default EndpointDetails;
