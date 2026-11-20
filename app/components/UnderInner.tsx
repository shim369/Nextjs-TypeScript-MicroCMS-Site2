import styles from '../styles/page.module.scss'

interface UnderInnerProps {
  title: string;
  /** Short label shown in the meta row above the title (e.g. "Who I am") */
  label?: string;
}

export const UnderInner = ({ title, label }: UnderInnerProps) => {
  return (
    <div className={styles.pageHead}>
      <div className={styles.wrap}>
        <div className={styles.metaRow}>
          <span>{label ? `(${label})` : '(NEXT BASE)'}</span>
          <span>Est. 2023 — Tokyo, JP</span>
        </div>
        <h1 className={styles.pageTitle}>
          <span className={styles.pageTitleClip}>
            <span>{title}<span className={styles.hot} aria-hidden="true">.</span></span>
          </span>
        </h1>
      </div>
    </div>
  );
};
