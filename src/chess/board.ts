export function squareToCoords(square: string) {
    const file = square.charCodeAt(0) - 97;
    const rank = 8 - Number(square[1]);

    return { rank, file };
}