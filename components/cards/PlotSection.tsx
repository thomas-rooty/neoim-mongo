'use client';
import styles from './PlotSection.module.css';
import {useStore} from "../../store/zustore";
import dynamic from "next/dynamic";

const PlotDynamic = dynamic(() => import('react-plotly.js'), {ssr: false});

const PlotSection = () => {
  const [neo] = useStore(state => [state.neo, state.setNeo]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Plot of Estimated Diameter vs. Palermo Scale</h1>
        </div>
      </div>
      <div className={styles.container}>
        {neo['summary'] &&
          <PlotDynamic
            className={styles.plot}
            data={[
              {
                x: [neo.summary.ps_max],
                y: [neo.summary.diameter * 1000],
                type: 'scatter',
                mode: 'markers',
                marker: {
                  color: 'red',
                  size: 12,
                },
              },
            ]}
            layout={{
              title: 'Potentially Hazardous Asteroid',
              xaxis: {
                title: 'Palermo Scale (max.)',
                zeroline: false,
                color: 'white',
                fixedrange: true,
                range: [10, -10]
              },
              yaxis: {
                title: 'Estimated Diameter (m)',
                zeroline: false,
                color: 'white',
                fixedrange: true,
                range: [0, (neo.summary.diameter * 1000) * 1.5]
              },
              paper_bgcolor: '#17191F',
              plot_bgcolor: '#17191F',
              font: {
                color: '#fff',
              }
            }}
            config={{
              displayModeBar: false,
              responsive: true,
            }}
          />
        }
      </div>
    </div>
  );
};

// @ts-ignore
export default PlotSection;