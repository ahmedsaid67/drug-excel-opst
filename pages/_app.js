import '../styles/globals.css'
import Link from 'next/link'
import styles from '../styles/ilac.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>Anasayfa</Link>
        <Link href="/hassasiyetTruruCreate" passHref className={styles.navLink}>
          hassasiyetTruruCreate
        </Link>
        <Link href="/FormCreate" passHref className={styles.navLink}>
          FormCreate
        </Link>

        <Link href="/ilacKategoriCreate" passHref className={styles.navLink}>
          ilacKategoriCreate
        </Link>
        
        <Link href="/hastalikCreate" passHref className={styles.navLink}>
          hastalikCreate
        </Link>

        <Link href="/ilacCreate" passHref className={styles.navLink}>
          ilacCreate
        </Link>
        {/* Diğer sayfalar için bağlantılar */}
      </nav>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
