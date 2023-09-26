import "components/General/ButtonIcon/ButtonIcon.scss";

interface ButtonIconProps {
    iconSVG: string;
    caption: string;
    onClick: () => void
}

export default function ButtonIcon({
    iconSVG,
    caption,
    onClick,
}: ButtonIconProps) {
    return (
        <button type="button" onClick={onClick}>
            <img
                className="buttonIcon"
                src={iconSVG}
                alt={caption}
            />
        </button>
    )
}
