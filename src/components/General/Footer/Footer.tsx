import { AppInfo } from "models/Interface";

import "components/General/Footer/Footer.scss";

export default function Footer() {
    return <footer><p>{AppInfo.author}</p></footer>
}