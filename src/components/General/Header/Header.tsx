import { AppInfo } from "models/Interface";

import "components/General/Header/Header.scss";

export default function Header() {
    return <header><p>{AppInfo.name}</p></header>
}