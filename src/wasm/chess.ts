import chessWasm from "./wasm.mjs"

let exportsObj: any;

export async function initChessWasm() {
    const wasmModule = await chessWasm();

    exportsObj = wasmModule;

    console.log(exportsObj)

    return chessWasm;




    // const response = await fetch("/chess.wasm");

    // const bytes = await response.arrayBuffer();

    // const { instance } = await WebAssembly.instantiate(bytes, {});

    // exportsObj = instance.exports;

    // return exportsObj;
}

function readCString(memory: WebAssembly.Memory, ptr: number) {
    const bytes = new Uint8Array(memory.buffer);

    let str = "";

    while (bytes[ptr] !== 0) {
        str += String.fromCharCode(bytes[ptr]);
        ptr++;
    }

    return str;
}

function writeCString(
    memory: WebAssembly.Memory,
    ptr: number,
    str: string
) {
    const bytes = new Uint8Array(memory.buffer);

    for (let i = 0; i < str.length; i++) {
        bytes[ptr + i] = str.charCodeAt(i);
    }

    bytes[ptr + str.length] = 0;
}

export function loadFen(fen: string) {
    exportsObj.ccall(
        "load_fen",
        null,
        ["string"],
        [fen],
    );
}

export function getFen() {
    const str = exportsObj.ccall(
        "get_fen",
        "string",
        null,
        null,
    );
    return str;
}

export function getMoves(): string[] {
    const str = exportsObj.ccall(
        "get_moves",
        "string",
        null,
        null,
    );

    return str.split(",");
}

export function getBestMove(depth: number) {
    const str = exportsObj.ccall(
        "get_best_move",
        "string",
        ["int"],
        [depth],
    );

    const [moveStr, evalStr] = str.split(",");

    return {
        move: moveStr,
        eval: parseInt(evalStr) / 100,
    };
}

export function doMove(move: string) {
    exportsObj.ccall(
        "do_move",
        null,
        ["string"],
        [move],
    );
}