import searchIcon from "components/General/SearchInput/search.svg";

import styles from "components/General/SearchInput/SearchInput.module.scss";

interface SearchInputProps {
    value: string;
    placeholderValue: string;
    onChange: (value: string) => void;
}

export default function SearchInput({
    value,
    placeholderValue,
    onChange,
}: SearchInputProps) {
    function preventEvent(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <form className={styles.wrapper}
            onSubmit={preventEvent}
        >
            <input
                type="search"
                placeholder={placeholderValue}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            <img
                className={styles.icon}
                src={searchIcon}
                alt="Search Icon"
            />
        </form>
    )
}
