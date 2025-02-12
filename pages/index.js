import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/ilac.module.css'

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      
      <div className={styles.rightContainer}>
        <Link href="/yasDozCreate" passHref>
          <button className={styles.button}>yasDozCreate'e Git</button>
        </Link>

        <Link href="/kiloDozCreate" passHref>
          <button className={styles.button}>kiloDozCreate'e Git</button>
        </Link>

        <Link href="/ArtanKiloDozCreate" passHref>
          <button className={styles.button}>Artan Kilo Doz Create</button>
        </Link>
        <Link href="/AzalanKiloDozCreate" passHref>
          <button className={styles.button}>Azalan Kilo Doz Create</button>
        </Link>
        <Link href="/ExplanationCreate" passHref>
          <button className={styles.button}>Explanation Create</button>
        </Link>
        <Link href="/hastalikYasDozCreate" passHref>
          <button className={styles.button}>Hastalık Yaş Doz Create</button>
        </Link>
        <Link href="/hastalikKiloDozCreate" passHref>
          <button className={styles.button}>Hastalık Kilo Doz Create</button>
        </Link>
        <Link href="/HastalikHemYasaHemKiloyaBagliAzalanDozCreate" passHref>
          <button className={styles.button}>Hem Yaşa Hem Kiloya Bağlı Azalan Doz Create</button>
        </Link>
        <Link href="/HastalikHemYasaHemKiloyaBagliArtanDozCreate" passHref>
          <button className={styles.button}>Hem Yaşa Hem Kiloya Bağlı Artan Doz Create</button>
        </Link>
        <Link href="/HastalikAzalanKiloCreate" passHref>
          <button className={styles.button}>Hastalık Azalan Kilo Create</button>
        </Link>
        <Link href="/hastalikArtanKiloDozCreate" passHref>
          <button className={styles.button}>Hastalık Artan Kilo Create</button>
        </Link>
        <Link href="/supplementCreate" passHref>
          <button className={styles.button}>Supplement Create</button>
        </Link>
        <Link href="/productCreate" passHref>
          <button className={styles.button}>Product Create</button>
        </Link>
      </div>
    </div>
  )
}
