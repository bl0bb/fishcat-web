import type { CSSProperties } from "react";
import type { Piece } from "../chess/types";
import ChessPiece from "./Piece";

interface Props {
    square: string;
    piece: Piece | null;
    dark: boolean;
    selected: boolean;
    legalMove: boolean;
    onClick(): void;
}

export default function Square({
    square,
    piece,
    dark,
    selected,
    legalMove,
    onClick,
}: Props) {
    const file = square[0];
    const rank = square[1];
    const fileIdx = square.charCodeAt(0) - 97; // a
    const rankIdx = square.charCodeAt(1) - 49; // 1

    return (
        <button
            className={[
                "square",
                dark ? "dark" : "light",
                selected ? "selected" : "",
            ].join(" ")}
            style={{
                "--square-x": fileIdx,
                "--square-y": 7 - rankIdx,
            } as CSSProperties}
            onClick={onClick}
        >
            {piece && (
                <ChessPiece piece={piece} />
            )}

            {!piece && legalMove && (
                <div className="move-dot" />
            )}
            {piece && legalMove && (
                <div className="move-circle" />
            )}

            {file === "a" && (
                <span className="rank-label">
                    {rank}
                </span>
            )}

            {rank === "1" && (
                <span className="file-label">
                    {file}
                </span>
            )}
        </button>
    );
}