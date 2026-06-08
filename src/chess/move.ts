export interface Move {
    from: string;
    to: string;
    promotion?: string;
}

export function parseMove(move: string): Move {
    return {
        from: move.slice(0, 2),
        to: move.slice(2, 4),
        promotion: move.length > 4 ? move[4] : undefined,
    };
}