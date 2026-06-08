import type { Piece } from "../chess/types";

interface Props {
    piece: Piece;
}

export default function ChessPiece({
    piece,
}: Props) {
    const src = `/piece/${piece.color
        }${piece.type}.svg`;

    return (
        <img
            src={src}
            draggable={false}
            alt=""
            className="piece"
        />
    );
}