import { PieceType, chessPiece } from "./pieces";
import { square } from "./squares";

export function canMove(tarSqr: square, piece: chessPiece): boolean {
    switch (piece.pieceType) {
        case PieceType.Pawn: return canPawnMove(tarSqr, piece);
        case PieceType.Rook:
        case PieceType.Bishop:
        case PieceType.Knight:
        case PieceType.Queen:
        case PieceType.King:
            return true;
    }
}

function canPawnMove(tarSqr: square, piece: chessPiece): boolean {
    if (tarSqr.empty) {
        let range = 0;
        if (piece.color === "black") {
            const startingBlackRow = 7;
            range = piece.row === startingBlackRow ? -2 : -1;
        } else {
            const startingWhiteRow = 2;
            range = piece.row === startingWhiteRow ? 2 : 1;
        }

        if (tarSqr.col !== piece.column) return false;

        return tarSqr.row - piece.row <= range;
    } else {

    }

    return false;

}
