'use client';
import styles from './NeoDetails.module.css'
import {useStore} from "../../store/zustore";
import {useEffect} from "react";

const NeoDetails = () => {
  const [neo, setNeo] = useStore(state => [state.neo, state.setNeo]);
  const [loadingNEO, setLoadingNEO] = useStore(state => [state.loadingNEO, state.setLoadingNEO]);
  const [choosenNeo] = useStore(state => [state.choosenNeo]);

  useEffect(() => {
    setLoadingNEO(true);
    const fetchData = async () => {
      const res = await fetch('/api/mongo/' + choosenNeo);
      const data = await res.json();
      setNeo(data.neo[0]);
      console.log(data.neo);
      setLoadingNEO(false);
    };
    fetchData();
  }, [choosenNeo]);

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
            <h1>Neo Details</h1>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContentLeftContentItem}>
              <div className={styles.modalBodyContentLeftContentItemTitle}>
                <h3>Neo Designation</h3>
              </div>
              <div className={styles.modalBodyContentLeftContentItemValue}>
                <p>{neo.des}</p>
              </div>
            </div>
            <div className={styles.modalBodyContentLeftContentItem}>
              <div className={styles.modalBodyContentLeftContentItemTitle}>
                <h3>Range</h3>
              </div>
              <div className={styles.modalBodyContentLeftContentItemValue}>
                <p>{neo.range}</p>
              </div>
            </div>
            <div className={styles.modalBodyContentRightContent}>
              <div className={styles.modalBodyContentLeftContentItem}>
                <div className={styles.modalBodyContentLeftContentItemTitle}>
                  <h3>Last seen</h3>
                </div>
                <div className={styles.modalBodyContentLeftContentItemValue}>
                  <p>{neo.last_obs}</p>
                </div>
              </div>
              <div className={styles.modalBodyContentLeftContentItem}>
                <div className={styles.modalBodyContentLeftContentItemTitle}>
                  <h3>Impact Probability</h3>
                </div>
                <div className={styles.modalBodyContentLeftContentItemValue}>
                  <p>{neo.ip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NeoDetails;
