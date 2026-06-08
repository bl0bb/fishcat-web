import { useEffect, useMemo, useState } from "react";

import "./App.css";

import ChessBoard from "./components/ChessBoard";

import { fenToBoard } from "./chess/fen";

import {
    initChessWasm,
    loadFen,
    getMoves,
    getBestMove,
} from "./wasm/chess";

const START_FEN =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default function App() {
    const [loading, setLoading] = useState(true);

    const [fen, setFen] = useState(START_FEN);

    const [selectedSquare, setSelectedSquare] =
        useState<string | undefined>();

    const [allLegalMoves, setAllLegalMoves] =
        useState<string[]>([]);

    const [bestMove, setBestMove] =
        useState<string>("");

    /*
     * Parse FEN -> UI board
     */
    const board = useMemo(
        () => fenToBoard(fen),
        [fen]
    );

    /*
     * Only show moves for selected piece
     */
    const legalMovesForSelection =
        useMemo(() => {
            if (!selectedSquare) return [];

            return allLegalMoves.filter(
                move =>
                    move.slice(0, 2) === selectedSquare
            );
        }, [allLegalMoves, selectedSquare]);

    /*
     * Load WASM once
     */
    useEffect(() => {
        async function init() {
            await initChessWasm();

            loadFen(START_FEN);

            setAllLegalMoves(getMoves());

            setLoading(false);
        }

        init();
    }, []);

    const onSquareClick = (
        square: string
    ) => {
        if (loading) return;

        /*
         * First click
         */
        if (!selectedSquare) {
            setSelectedSquare(square);
            return;
        }

        /*
         * Same square -> deselect
         */
        if (square === selectedSquare) {
            setSelectedSquare(undefined);
            return;
        }

        /*
         * Find move
         */
        const move = allLegalMoves.find(
            m =>
                m.slice(0, 2) === selectedSquare &&
                m.slice(2, 4) === square
        );

        if (!move) {
            setSelectedSquare(square);
            return;
        }

        console.log("play move:", move);

        /*
         * Future WASM integration:
         *
         * make_move(move)
         * const newFen = get_fen()
         *
         * setFen(newFen)
         * setAllLegalMoves(getMoves())
         */

        setSelectedSquare(undefined);
    };

    const analyzePosition = () => {
        const best = getBestMove(5);

        setBestMove(best);
    };

    if (loading) {
        return (
            <div className="loading">
                Loading engine...
            </div>
        );
    }

    return (
        <div className="app">
            <div className="board-section">
                <ChessBoard
                    board={board}
                    selected={selectedSquare}
                    legalMoves={legalMovesForSelection}
                    onSquareClick={onSquareClick}
                />
            </div>

            <aside className="sidebar">
                <h2>Analysis</h2>

                <button
                    onClick={analyzePosition}
                    className="analyze-btn"
                >
                    Find Best Move
                </button>

                <div className="analysis-box">
                    <strong>Engine:</strong>

                    <div>
                        {bestMove || "No analysis"}
                    </div>
                </div>

                <div className="analysis-box">
                    <strong>FEN</strong>

                    <textarea
                        readOnly
                        value={fen}
                        rows={6}
                    />
                </div>
            </aside>
        </div>
    );
}