import { useEffect, useMemo, useState } from "react";

import "./App.css";

import ChessBoard from "./components/ChessBoard";

import { fenToBoard } from "./chess/fen";

import {
    initChessWasm,
    loadFen,
    getMoves,
    getBestMove,
    doMove,
    getFen,
} from "./wasm/chess";
import ChessEvaluationBar from "./components/EvaluationBar";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const MAX_DEPTH = 5;

export default function App() {
    const [loading, setLoading] = useState(true);

    const [fen, setFen] = useState(START_FEN);
    const [fenInput, setFenInput] = useState(START_FEN);
    const [searchDepth, setSearchDepth] = useState(3);

    const [selectedSquare, setSelectedSquare] = useState<string | undefined>();
    const [allLegalMoves, setAllLegalMoves] = useState<string[]>([]);
    const [bestMove, setBestMove] = useState<string>("");
    const [evaluation, setEvaluation] = useState<number>(0);

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

        doMove(move);
        const newFen = getFen();
        setFen(newFen);
        setFenInput(newFen);
        setAllLegalMoves(getMoves());

        setSelectedSquare(undefined);
    };

    const analyzePosition = () => {
        const best = getBestMove(searchDepth);

        setBestMove(best.move);
        setEvaluation(best.eval);
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
            <div className="game">
                <ChessEvaluationBar
                    evaluation={evaluation}
                />
                <ChessBoard
                    board={board}
                    selected={selectedSquare}
                    legalMoves={legalMovesForSelection}
                    onSquareClick={onSquareClick}
                />

                <aside className="sidebar">
                    <h2>Analysis</h2>


                    <div className="best_move_box">
                        <input className="game_input"
                            onChange={(e) => setSearchDepth(Math.min(parseInt(e.target.value) || 0, MAX_DEPTH))}
                            value={searchDepth}
                        />
                        <button
                            onClick={analyzePosition}
                            className="analyze_btn"
                        >
                            Analyze
                        </button>
                    </div>

                    <div className="analysis_box">
                        <strong>Engine:</strong>

                        <div>
                            {bestMove || "No analysis"}
                        </div>
                    </div>

                    <div className="analysis_box">
                        <strong>FEN</strong>

                        <input className="game_input"
                            value={fenInput}
                            onChange={(e) => {
                                setFenInput(e.target.value);
                            }}
                        />

                        <button
                            className="analyze_btn"
                            onClick={() => setFen(fenInput)}
                        >
                            Update
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}