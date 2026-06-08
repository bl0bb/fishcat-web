import type { Board } from "../chess/types";
import Square from "./Square";

interface Props {
    board: Board;
    selected?: string;
    legalMoves: string[];
    onSquareClick(square: string): void;
}

export default function ChessBoard({
    board,
    selected,
    legalMoves,
    onSquareClick,
}: Props) {
    return (
        <div className="chessboard">
            {board.map((row, rank) =>
                row.map((piece, file) => {
                    const square =
                        String.fromCharCode(97 + file) +
                        (8 - rank);

                    const isDark =
                        (rank + file) % 2 === 1;

                    const isSelected =
                        selected === square;

                    const isLegalMove =
                        legalMoves.some(
                            move =>
                                move.slice(2, 4) === square
                        );

                    return (
                        <Square
                            key={square}
                            square={square}
                            piece={piece}
                            dark={isDark}
                            selected={isSelected}
                            legalMove={isLegalMove}
                            onClick={() =>
                                onSquareClick(square)
                            }
                        />
                    );
                })
            )}
        </div>
    );
}