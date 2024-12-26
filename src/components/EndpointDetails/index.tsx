// src/components/EndpointDetails.tsx
import React from "react";
import ReactJson from "@microlink/react-json-view";
import DetailsTable, { type TableRow } from "./EndpointDetailsTable";
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
  successResponses: {
    code: number;
    body: string;
  }[];
  errors?: EndpointErrorProps[];
}

const EndpointDetails = ({
  title,
  description,
  endpoint,
  protected: isProtected,
  parameters,
  successResponses,
  errors,
}: EndpointDetailsProps) => {
  const buildResponseBody = (body: string): React.ReactNode => {
    let _successResponseBody;
    try {
      if (typeof body === "string" && body.length)
        _successResponseBody = (
          <ReactJson
            name={false}
            src={JSON.parse(body)}
            theme="rjv-default"
            collapsed={false}
            displayObjectSize={false}
          />
        );
      else _successResponseBody = "-";

      return _successResponseBody;
    } catch (ee) {
      throw new Error("Malformed json");
    }
  };

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
        ]}
      />
      <h5>Success</h5>
      <DetailsTable
        rows={successResponses.map(
          (success): TableRow => ({
            key: success.code.toString(),
            value: buildResponseBody(success.body),
          })
        )}
      />
      <h5>Errors</h5>
      <DetailsTable
        rows={[
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
