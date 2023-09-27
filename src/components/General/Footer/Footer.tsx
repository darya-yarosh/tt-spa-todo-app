import { AppInfo } from "models/Interface";

import styles from "components/General/Footer/Footer.module.scss";

export default function Footer() {
    return <footer className={styles.wrapper}>
        <p className={styles.author}>{AppInfo.author}</p>
    </footer>
}