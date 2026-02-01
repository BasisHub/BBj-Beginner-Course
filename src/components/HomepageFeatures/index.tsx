import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    title: 'Read Legacy Code',
    description:
      'Understand inherited BBj codebases across all four generations — character UI, Visual PRO/5, BBj GUI, and DWC.',
  },
  {
    title: 'Modern-First',
    description:
      'Learn current BBj patterns as the default way to write code, with legacy patterns explained as context you\'ll encounter.',
  },
  {
    title: 'Hands-On',
    description:
      'Every chapter includes runnable BBj sample files so you learn by doing, not just reading.',
  },
];

function Feature({title, description}: FeatureItem): ReactNode {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.feature}>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
