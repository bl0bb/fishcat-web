interface Props {
    bestMove: string;
    onAnalyze(): void;
}

export default function AnalysisPanel({
    bestMove,
    onAnalyze,
}: Props) {
    return (
        <div>
            <button onClick={onAnalyze}>
                Analyze
            </button>

            <h3>Best Move</h3>

            <div>{bestMove || "-"}</div>
        </div>
    );
}