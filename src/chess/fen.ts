import type { Board, Piece } from "./types";

export function fenToBoard(fen: string): Board {
    const board: Board = Array.from(
        { length: 8 },
        () => Array(8).fill(null)
    );

    const rows = fen.split(" ")[0].split("/");

    rows.forEach((row, rank) => {
        let file = 0;

        for (const ch of row) {
            const num = Number(ch);

            if (!isNaN(num)) {
                file += num;
                continue;
            }

            const piece: Piece = {
                color: ch === ch.toUpperCase() ? "w" : "b",
                type: ch.toLowerCase() as Piece["type"],
            };

            board[rank][file] = piece;
            file++;
        }
    });

    return board;
}