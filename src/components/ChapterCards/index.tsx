import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ChapterItem = {
  title: string;
  slug: string;
  description: string;
  comingSoon?: boolean;
};

const chapters: ChapterItem[] = [
  {
    title: 'Introduction',
    slug: '/introduction',
    description:
      'Course orientation, prerequisites, and how to use this material.',
  },
  {
    title: 'Getting Started',
    slug: '/getting-started',
    description:
      'Set up your environment, write your first BBj program, and learn basic syntax.',
  },
  {
    title: 'Object-Oriented BBj',
    slug: '/object-oriented',
    description:
      'Classes, methods, inheritance, and OOP patterns in BBj.',
  },
  {
    title: 'Error Handling',
    slug: '/error-handling',
    description:
      'SETERR, THROW, ON ERR, error codes, and try/catch patterns.',
    comingSoon: true,
  },
  {
    title: 'Strings and Numbers',
    slug: '/strings-and-numbers',
    description:
      'Daily-use string and numeric functions: LEN, MID, POS, CVS, STR, NUM.',
    comingSoon: true,
  },
  {
    title: 'Collections',
    slug: '/collections',
    description:
      'BBjVector, BBjHashMap, Java collections interop, and iteration patterns.',
    comingSoon: true,
  },
  {
    title: 'File I/O and Record Access',
    slug: '/file-io',
    description:
      'Record-oriented file access, string templates, and data channels. Context for legacy systems.',
  },
  {
    title: 'Database and SQL',
    slug: '/database-sql',
    description:
      'SQL connections, prepared statements, and BBjRecordSet.',
    comingSoon: true,
  },
  {
    title: 'Java Interop',
    slug: '/java-interop',
    description:
      'Call Java classes from BBj, use Java libraries, and extend Java interfaces.',
    comingSoon: true,
  },
  {
    title: 'Event Handling',
    slug: '/event-handling',
    description:
      'setCallback, event objects, the process_events loop, and common event types.',
    comingSoon: true,
  },
  {
    title: 'Debugging',
    slug: '/debugging',
    description:
      'BBj IDE debugger, BEM, error codes, and troubleshooting techniques.',
    comingSoon: true,
  },
  {
    title: 'Web Development',
    slug: '/web-development',
    description:
      'Deploy BBj applications to the web with the Dynamic Web Client.',
  },
];

function ChapterCard({
  index,
  chapter,
}: {
  index: number;
  chapter: ChapterItem;
}): ReactNode {
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <Link
        to={chapter.slug}
        className={clsx(styles.card, chapter.comingSoon && styles.comingSoon)}>
        <div className={styles.chapterNumber}>
          Chapter {index + 1}
          {chapter.comingSoon && <span className={styles.badge}>Coming Soon</span>}
        </div>
        <div className={styles.cardTitle}>{chapter.title}</div>
        <p className={styles.cardDescription}>{chapter.description}</p>
      </Link>
    </div>
  );
}

export default function ChapterCards(): ReactNode {
  return (
    <section className={styles.chapters}>
      <div className="container">
        <Heading as="h2">Course Chapters</Heading>
        <div className="row">
          {chapters.map((chapter, idx) => (
            <ChapterCard key={chapter.slug} index={idx} chapter={chapter} />
          ))}
        </div>
      </div>
    </section>
  );
}
