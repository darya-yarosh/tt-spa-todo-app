import { useState } from "react";

import { AppInfo, Theme } from "models/Interface";

import ButtonIcon from "components/General/ButtonIcon/ButtonIcon";
import themeIcon from "images/buttons/theme.svg";

import styles from "components/General/Footer/Footer.module.scss";

export default function Footer() {
    const [currentTheme, setCurrentTheme] = useState<Theme>("white")

    function changeTheme() {
        currentTheme === "dark" ? setWhiteTheme() : setBlackTheme()
    }

    function setBlackTheme() {
        const appElement = document.getElementById('app');

        if (appElement !== null) appElement.classList.add('dark-theme');
        setCurrentTheme("dark");
    }
    function setWhiteTheme() {
        const appElement = document.getElementById('app');

        if (appElement !== null) appElement.classList.remove('dark-theme');
        setCurrentTheme("white");
    }

    return <footer className={styles.wrapper}>
        <span className={styles.line} />
        <section>
            <p className={styles.author}>{AppInfo.author}</p>
            <ButtonIcon iconSVG={themeIcon} caption={"Button for change theme style."} onClick={changeTheme} />
        </section>
    </footer>
}