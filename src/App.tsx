import { useEffect, type FC } from 'react';

import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import ThreeDScene from './components/ThreeDScene';

const App: FC = () => {
  useEffect(() => {
    document.title = 'test';
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.hero} id="home">
        <section className={styles.canvasSection} aria-label="3D automation preview">
          <span className={styles.canvasLabel}>Live Prototype</span>
          <ThreeDScene />
        </section>
        <section className={styles.contentSection} id="about">
          <p className={styles.kicker}>test</p>
          <h1 className={styles.title}>test</h1>
          <p className={styles.subtitle}>
            test         
          </p>
          <div className={styles.ctaGroup}>
            <button type="button" className={styles.primaryCta}>
              Get started
            </button>
            <a className={styles.secondaryCta} href="#pricing">
              test
            </a>
          </div>
        </section>
        <div id="pricing" aria-hidden="true" />
      </main>
    </>
  );
};

export default App;
