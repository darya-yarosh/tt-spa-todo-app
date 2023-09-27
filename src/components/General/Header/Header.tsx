import { AppInfo } from "models/Interface";

import styles from "components/General/Header/Header.module.scss";

export default function Header() {
    return <header className={styles.header}><p className={styles.title}>{AppInfo.name}</p></header>
}