import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Introduction to BBj Development
        </Heading>
        <p className={styles.heroSubtitle}>
          A hands-on course for experienced developers new to BBj &mdash;
          learn modern patterns, understand legacy code, and start building.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg"
            to="/introduction">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}
