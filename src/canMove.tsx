import { PieceType, chessPiece } from "./pieces";
import { square } from "./squares";

export function canMove(tarSqr: square, piece: chessPiece, board: square[]): boolean {
    const collisionPassed = checkCollision(tarSqr, piece, board);
    switch (piece.pieceType) {
        case PieceType.Pawn: return collisionPassed && canPawnMove(tarSqr, piece);
        case PieceType.Bishop: return collisionPassed && canBishopMove(tarSqr, piece);
        case PieceType.Knight: return canKnightMove(tarSqr, piece);
        case PieceType.Rook: return collisionPassed && canRookMove(tarSqr, piece);
        case PieceType.Queen: return collisionPassed && canQueenMove(tarSqr, piece);
        case PieceType.King: return canKingMove(tarSqr, piece);
    }
}
function checkCollision(tarSqr: square, piece: chessPiece, board: square[]): boolean {
    return true;
}

function canPawnMove(tarSqr: square, piece: chessPiece): boolean {
    //Moving to blank square
    if (tarSqr.empty) {
        //Must only move vertically
        if (tarSqr.col !== piece.column) return false;

        let range;
        //Black Piece
        if (piece.color === "black") {
            const startingBlackRow = 7;
            range = piece.row === startingBlackRow ? 2 : 1;
            return piece.row - tarSqr.row <= range;
        }
        //White Piece
        else {
            const startingWhiteRow = 2;
            range = piece.row === startingWhiteRow ? 2 : 1;
            return tarSqr.row - piece.row <= range;
        }
    }
    //Capturing a piece
    else {
        //Must move left or right by 1 column
        if (tarSqr.col !== piece.column - 1 && tarSqr.col !== piece.column + 1) return false;

        //Black Piece must move down 1 row
        if (piece.color === "black") return tarSqr.row === piece.row - 1;
        //White Piece must move up 1 row
        else return tarSqr.row === piece.row + 1;
    }
}

function canRookMove(tarSqr: square, piece: chessPiece): boolean {
    return tarSqr.col === piece.column || tarSqr.row === piece.row;
}

function canBishopMove(tarSqr: square, piece: chessPiece): boolean {
    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.column);
    return rowDiff === colDiff;
}

function canQueenMove(tarSqr: square, piece: chessPiece): boolean {
    if (tarSqr.col === piece.column || tarSqr.row === piece.row) return true;

    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.column);
    return rowDiff === colDiff;
}

function canKingMove(tarSqr: square, piece: chessPiece): boolean {
    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.column);
    return rowDiff <= 1 && colDiff <= 1;
}

function canKnightMove(tarSqr: square, piece: chessPiece): boolean {
    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.column);
    if (rowDiff > 2 || colDiff > 2) return false;

    if (colDiff === 2) {
        return rowDiff === 1;
    } else if (rowDiff === 2) {
        return colDiff === 1;
    } else return false;
}