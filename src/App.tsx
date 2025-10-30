import { useEffect, type FC } from 'react';

import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import ThreeDScene from './components/ThreeDScene';

const App: FC = () => {
  useEffect(() => {
    document.title = 'GenAuxi — Intelligent Automation';
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
          <p className={styles.kicker}>AI-driven automation</p>
          <h1 className={styles.title}>About GenAuxi</h1>
          <p className={styles.subtitle}>
            GenAuxi orchestrates intelligent workflows that help modern teams prototype faster, adapt in
            real time, and scale automation with confidence.
          </p>
          <div className={styles.ctaGroup}>
            <button type="button" className={styles.primaryCta}>
              Get started
            </button>
            <a className={styles.secondaryCta} href="#pricing">
              View pricing
            </a>
          </div>
        </section>
        <div id="pricing" aria-hidden="true" />
      </main>
    </>
  );
};

export default App;
