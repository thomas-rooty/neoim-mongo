'use client';
import styles from './NeoTable.module.css';
import {useEffect} from "react";
import {useStore} from "../../store/zustore";

const NeoTable = () => {
  // Loading state
  const [loadingNEOs, setLoadingNEOs] = useStore(state => [state.loadingNEOs, state.setLoadingNEOs]);

  // Fetch from /api/neo all the neos and store in state to be used in the table
  const [neosMongo, setNeosMongo] = useStore(state => [state.neosMongo, state.setNeosMongo]);
  const [hMax] = useStore(state => [state.hMax]);
  const [ps] = useStore(state => [state.ps]);
  useEffect(() => {
    setLoadingNEOs(true);
    const fetchData = async () => {
      const res = await fetch('/api/mongo/' + hMax + '/' + ps);
      const data = await res.json();
      console.log(data);
      setNeosMongo(data.neos);
      setLoadingNEOs(false);
    };
    fetchData();
  }, [hMax, ps]);

  const handleRowClick = (e: any) => {
    // Console log the id of the row clicked
    console.log(e.target.parentNode.id);
  }

  if (loadingNEOs) {
    return (
      <div className={styles.card}>
        <div className={styles.loading}>Fetching data from <i>CNEOS Sentry System</i>...</div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
          <tr>
            <th>Designation</th>
            <th>Year Range</th>
            <th>Potential Impacts</th>
            <th>Impact Probability</th>
            <th>Velocity (km/s)</th>
            <th>H (mag)</th>
            <th>Diameter (km)</th>
            <th>Palermo Scale (cum.)</th>
            <th>Palermo Scale (max.)</th>
          </tr>
          </thead>
          <tbody>
          {neosMongo.map((neo: any) => (
            <tr id={neo.des} key={neo.des} onClick={handleRowClick}>
              <td>{neo.des}</td>
              <td>{neo.range}</td>
              <td>{neo.n_imp}</td>
              <td>{neo.ip}</td>
              <td>{neo.v_inf}</td>
              <td>{neo.h}</td>
              <td>{neo.diameter}</td>
              <td>{neo.ps_cum}</td>
              <td>{neo.ps_max}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default NeoTable;
