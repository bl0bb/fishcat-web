import type { Piece } from "../chess/types";

interface Props {
    piece: Piece;
}

export default function ChessPiece({
    piece,
}: Props) {
    const src = `${import.meta.env.BASE_URL}/piece/${piece.color}${piece.type}.svg`;

    return (
        <img
            src={src}
            draggable={false}
            alt=""
            className="piece"
        />
    );
}