import "./EvaluationBar.css";

interface ChessEvaluationBarProps {
    evaluation: number;
    mate?: number | null;
    className?: string;
}

const MAX_EVAL = 10;

export default function ChessEvaluationBar({
    evaluation,
    mate = null,
    className = "",
}: ChessEvaluationBarProps) {
    const getWhitePercentage = () => {
        if (mate !== null) {
            return mate > 0 ? 100 : 0;
        }

        const clamped = Math.max(
            -MAX_EVAL,
            Math.min(MAX_EVAL, evaluation)
        );

        return ((clamped + MAX_EVAL) / (MAX_EVAL * 2)) * 100;
    };

    const whitePercent = getWhitePercentage();
    const blackPercent = 100 - whitePercent;

    const whiteWinning =
        mate !== null ? mate > 0 : evaluation >= 0;

    const displayText =
        mate !== null
            ? `M${Math.abs(mate)}`
            : evaluation > 0
                ? `+${evaluation.toFixed(1)}`
                : evaluation.toFixed(1);

    return (
        <div className={`eval_bar ${className}`}>
            <div
                className="eval_bar_white"
                style={{
                    height: `${whitePercent}%`,
                }}
            />

            <div
                className={`eval_bar_score ${whiteWinning
                        ? "eval_bar_score--on-white"
                        : "eval_bar_score--on-black"
                    }`}
                style={{
                    bottom: whiteWinning
                        ? `${Math.max(12, whitePercent - 3)}%`
                        : undefined,

                    top: !whiteWinning
                        ? `${Math.max(12, blackPercent - 3)}%`
                        : undefined,
                }}
            >
                {displayText}
            </div>
        </div>
    );
}