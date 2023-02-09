import styles from '../page.module.css'
import Navbar from '../../components/navbar/Navbar'
import ListMongo from "../../components/cards/ListMongo";
import EditionModal from "../../components/cards/EditionModal";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar/>
        <ListMongo/>
        <EditionModal/>
      </main>
    </div>
  )
}
