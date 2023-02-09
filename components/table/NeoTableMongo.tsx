'use client';
import styles from './NeoTable.module.css';
import {useEffect, useState} from "react";
import {useStore} from "../../store/zustore";

const NeoTable = () => {
  // Loading state
  const [loadingNEOs, setLoadingNEOs] = useStore(state => [state.loadingNEOs, state.setLoadingNEOs]);

  // Fetch from /api/neo all the neos and store in state to be used in the table
  const [neosMongo, setNeosMongo] = useStore(state => [state.neosMongo, state.setNeosMongo]);
  const [hMax] = useStore(state => [state.hMax]);
  const [ps] = useStore(state => [state.ps]);
  const [ipMin] = useStore(state => [state.ipMin]);
  const [setChoosenNeo] = useStore(state => [state.setChoosenNeo]);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    setLoadingNEOs(true);
    const fetchData = async () => {
      const res = await fetch('/api/mongo/' + hMax + '/' + ps + '/' + ipMin);
      const data = await res.json();
      setNeosMongo(data.neos);
      setLoadingNEOs(false);
    };
    fetchData();
  }, [hMax, ps, ipMin]);

  const handleRowClick = (e: any) => {
    setChoosenNeo(e.target.parentNode.id);
  }

  // Sort data in table by clicking on the header
  const sortData = (key: any) => {
    setNeosMongo([...neosMongo].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return b[key] > a[key] ? 1 : -1;
      }
    }));

    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

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
            <th onClick={() => sortData('n_imp')}>Potential Impacts ⇅</th>
            <th onClick={() => sortData('ip')}>Impact Probability ⇅</th>
            <th onClick={() => sortData('v_inf')}>Velocity (km/s) ⇅</th>
            <th onClick={() => sortData('h')}>H (mag) ⇅</th>
            <th onClick={() => sortData('diameter')}>Diameter (km) ⇅</th>
            <th onClick={() => sortData('ps_cum')}>Palermo Scale (cum.) ⇅</th>
            <th onClick={() => sortData('ps_max')}>Palermo Scale (max.) ⇅</th>
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
