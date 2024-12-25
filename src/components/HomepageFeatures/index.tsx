import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Secure by Design",
    description: (
      <>
        Complies with <b>IETF RFC</b> standards and protects against common threats and{" "}
        <b>OWASP Top 10</b> vulnerabilities
      </>
    ),
  },
  {
    title: "Modern Authentication",
    description: (
      <>
        Supports the latest authentication standards, including <b>OAuth 2.0</b>
        , <b>SSO</b>, <b>MFA</b>, and <b>WebAuthn</b>.
      </>
    ),
  },
  {
    title: "Developer-Friendly",
    description: (
      <>
        Design for the best experience, FlexAuthApi is effortless to configure,
        built for developers, and <b>API-first</b>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
