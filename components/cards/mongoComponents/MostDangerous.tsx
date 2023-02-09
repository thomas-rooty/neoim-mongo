'use client';
import styles from './MostDangerous.module.css'
import {useStore} from "../../../store/zustore";
import {useEffect} from "react";

const NeoDetails = () => {
  const [mDangerous, setMDangerous] = useStore(state => [state.mDangerous, state.setMDangerous]);
  const [loadingNEO, setLoadingNEO] = useStore(state => [state.loadingNEO, state.setLoadingNEO]);

  useEffect(() => {
    setLoadingNEO(true);
    const fetchData = async () => {
      const res = await fetch('/api/mongo/mdangerous');
      const data = await res.json();
      setMDangerous(data.mdangerous[0]);
      console.log(data.mdangerous[0]);
      setLoadingNEO(false);
    };
    fetchData();
  }, []);

  // Modal to edit the choosen NEO
  if (loadingNEO) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>Loading...</h1>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.loading}>Fetching data from <i>CNEOS Sentry System</i>...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>Most Dangerous NEO reported to date ⚠️</h1>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContentLeftContentItem}>
              <div className={styles.modalBodyContentLeftContentItemTitle}>
                <h3>Neo Designation</h3>
              </div>
              <div className={styles.modalBodyContentLeftContentItemValue}>
                <p>{mDangerous.des}</p>
              </div>
            </div>
            <div className={styles.modalBodyContentLeftContentItem}>
              <div className={styles.modalBodyContentLeftContentItemTitle}>
                <h3>Range</h3>
              </div>
              <div className={styles.modalBodyContentLeftContentItemValue}>
                <p>{mDangerous.range}</p>
              </div>
            </div>
            <div className={styles.modalBodyContentLeftContentItem}>
              <div className={styles.modalBodyContentLeftContentItemTitle}>
                <h3>Last seen</h3>
              </div>
              <div className={styles.modalBodyContentLeftContentItemValue}>
                <p>{mDangerous.last_obs}</p>
              </div>
            </div>
            <div className={styles.modalBodyContentLeftContentItem}>
              <div className={styles.modalBodyContentLeftContentItemTitle}>
                <h3>Impact Probability</h3>
              </div>
              <div className={styles.modalBodyContentLeftContentItemValue}>
                <p>{mDangerous.ip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NeoDetails;
