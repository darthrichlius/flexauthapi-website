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

export interface EndpointErrorProps {
  message: string;
  information: string;
}

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
  errors?: [
    {
      [k: number]: EndpointErrorProps[];
    }
  ];
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

  const buildErrorGroupHeader = (httpCode) => {
    let httpCodeText;
    switch (httpCode) {
      case 400:
        httpCodeText = "Bar Request";
        break;
    }

    return (
      <>
        <p>{httpCode}</p>
        <p>{httpCodeText}</p>
      </>
    );
  };

  const buildErrorDetails = (
    httpErrorCode: string,
    errors: EndpointErrorProps[]
  ): { key: React.ReactNode; value: React.ReactNode } => {
    return {
      key: buildErrorGroupHeader(httpErrorCode),
      value: (
        <>
          {errors.map((errDetails) => (
            <>
              <p>{errDetails.message}</p>
              {errDetails.information && <p>{errDetails.information}</p>}
            </>
          ))}
        </>
      ),
    };
  };

  return (
    <div className={styles.endpointDetails}>
      <h4
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />
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
        rows={Object.keys(errors).map((errorCode) => {
          const _errors = errors[errorCode];

          return _errors && Array.isArray(_errors)
            ? buildErrorDetails(errorCode, _errors)
            : {
                key: buildErrorGroupHeader(errorCode),
                value: <p>No Description</p>,
              };
        })}
      />
    </div>
  );
};

export default EndpointDetails;
