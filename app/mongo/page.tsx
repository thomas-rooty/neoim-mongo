import styles from '../page.module.css'
import Navbar from '../../components/navbar/Navbar'
import ListMongo from "../../components/cards/mongoComponents/ListMongo";
import NeoDetails from "../../components/cards/mongoComponents/NeoDetails";
import MostDangerous from "../../components/cards/mongoComponents/MostDangerous";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar/>
        <ListMongo/>
        <div className={styles.bottomCards}>
          <NeoDetails/>
          <MostDangerous/>
        </div>
      </main>
    </div>
  )
}
