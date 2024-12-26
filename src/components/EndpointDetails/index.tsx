// src/components/EndpointDetails.tsx
import React from "react";
import ReactJson from "@microlink/react-json-view";
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
  successResponseBody: string;
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
}: EndpointDetailsProps) => {
  let _successResponseBody;
  try {
    if (typeof successResponseBody === "string" && successResponseBody.length)
      _successResponseBody = (
        <ReactJson
          name={false}
          src={JSON.parse(successResponseBody)}
          theme="rjv-default"
          collapsed={false}
          displayObjectSize={false}
        />
      );
    else _successResponseBody = "-";
  } catch (ee) {
    throw new Error("Malformed json");
  }

  return (
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
            value: _successResponseBody,
          },
          {
            key: "Errors",
            value: errors ? (
              <EndpointDetailsErrorTable rows={errors} />
            ) : (
              "None"
            ),
          },
        ]}
      />
    </div>
  );
};

export default EndpointDetails;
