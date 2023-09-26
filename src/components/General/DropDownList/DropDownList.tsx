import styles from "components/General/DropDownList/DropDownList.module.scss";

interface DropDownListProps {
    title: string,
    list: [],
    onChange: () => void,
}

export default function DropDownList({
    title,
    list,
    onChange
}: DropDownListProps) {
    const selectID = `dropdown-list-${title}`;

    return <span>
        <label className={styles.label} htmlFor={selectID}>Design style:</label>
        <select className={styles.select} id={selectID} name={title} onChange={onChange}>
            {list.map((element, index) =>
                <option className={styles.option} key={element + index} value={element}>{element}</option>
            )}
        </select>
    </span>
}