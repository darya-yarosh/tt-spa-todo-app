import styles from "components/General/ButtonIcon/ButtonIcon.module.scss";

interface ButtonIconProps {
    iconSVG: string;
    caption: string;
    onClick: () => void;
}

export default function ButtonIcon({
    iconSVG,
    caption,
    onClick,
}: ButtonIconProps) {
    return (
        <button className={styles.wrapper} type="button" onClick={onClick}>
            <img
                className={styles.icon}
                src={iconSVG}
                alt={caption}
            />
        </button>
    )
}