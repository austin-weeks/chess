import { PieceType, chessPiece } from "./pieces";
import { square } from "./squares";

export function canMove(tarSqr: square, piece: chessPiece, board: square[]): boolean {
    const collisionPassed = checkCollision(tarSqr, piece, board);
    switch (piece.pieceType) {
        case PieceType.Pawn: return collisionPassed && canPawnMove(tarSqr, piece);
        case PieceType.Rook: return collisionPassed && canRookMove(tarSqr, piece);
        case PieceType.Bishop: return collisionPassed && canBishopMove(tarSqr, piece);
        case PieceType.Queen: return collisionPassed && canQueenMove(tarSqr, piece);
        case PieceType.Knight: return canKnightMove(tarSqr, piece);
        case PieceType.King: return canKingMove(tarSqr, piece);
    }
}

function canPawnMove(tarSqr: square, piece: chessPiece): boolean {
    //Moving to blank square
    if (tarSqr.empty) {
        //Must only move vertically
        if (tarSqr.col !== piece.col) return false;

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
        if (tarSqr.col !== piece.col - 1 && tarSqr.col !== piece.col + 1) return false;

        //Black Piece must move down 1 row
        if (piece.color === "black") return tarSqr.row === piece.row - 1;
        //White Piece must move up 1 row
        else return tarSqr.row === piece.row + 1;
    }
}

function canRookMove(tarSqr: square, piece: chessPiece): boolean {
    return tarSqr.col === piece.col || tarSqr.row === piece.row;
}

function canBishopMove(tarSqr: square, piece: chessPiece): boolean {
    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.col);
    return rowDiff === colDiff;
}

function canQueenMove(tarSqr: square, piece: chessPiece): boolean {
    if (tarSqr.col === piece.col || tarSqr.row === piece.row) return true;

    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.col);
    return rowDiff === colDiff;
}

function canKingMove(tarSqr: square, piece: chessPiece): boolean {
    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.col);
    return rowDiff <= 1 && colDiff <= 1;
}

function canKnightMove(tarSqr: square, piece: chessPiece): boolean {
    let rowDiff = Math.abs(tarSqr.row - piece.row);
    let colDiff = Math.abs(tarSqr.col - piece.col);
    if (rowDiff > 2 || colDiff > 2) return false;

    if (colDiff === 2) {
        return rowDiff === 1;
    } else if (rowDiff === 2) {
        return colDiff === 1;
    } else return false;
}

function checkCollision(tarSqr: square, piece: chessPiece, board: square[]): boolean {
    switch (piece.pieceType) {
        case PieceType.Pawn: return pawnCollision();
        case PieceType.Bishop: return diagonal();
        case PieceType.Rook: return straight();
        case PieceType.Queen: return queenCollision();
        default: return false;
    }
    function queenCollision(): boolean {
        if (tarSqr.col === piece.col || tarSqr.row === piece.row) return straight();
        else return diagonal();
    }

    function pawnCollision(): boolean {
        if (tarSqr.col !== piece.col) return true;

        const rowToCheck = piece.color === "white" ? 1 : -1;
        if (board.find(sq =>sq.col === piece.col && sq.row === piece.row + rowToCheck)?.empty) return true;
        else return false;
    }

    function diagonal(): boolean {
        //Moving Up
        const numChecks = Math.abs(tarSqr.row - piece.row) - 1;
        if (tarSqr.row > piece.row) {
            //Moving Up-Left
            if (tarSqr.col < piece.col) {
                let row = tarSqr.row - 1;
                let col = tarSqr.col + 1;
                for (let i = 0; i < numChecks; i++) {
                    if (!board.find(sq => sq.row === row && sq.col === col)?.empty) return false;
                    row--;
                    col++;
                }
            }
            //Moving Up-Right
            else {
                let row = tarSqr.row - 1;
                let col = tarSqr.col - 1;
                for (let i = 0; i < numChecks; i++) {
                    if (!board.find(sq => sq.row === row && sq.col === col)?.empty) return false;
                    row--;
                    col--;
                }
            }
        }
        //Moving Down
        else {
            //Moving Down-Left
            if (tarSqr.col < piece.col) {
                let row = tarSqr.row + 1;
                let col = tarSqr.col + 1;
                for (let i = 0; i < numChecks; i++) {
                    if (!board.find(sq => sq.row === row && sq.col === col)?.empty) return false;
                    row++;
                    col++;
                }
            }
            //Moving Down-Right 
            else {
                let row = tarSqr.row + 1;
                let col = tarSqr.col - 1;
                for (let i = 0; i < numChecks; i++) {
                    if (!board.find(sq => sq.row === row && sq.col === col)?.empty) return false;
                    row++;
                    col--;
                }
            }
        }
        //After all appropriate loops, no block was found, checks passed
        return true;
    }
    
    function straight(): boolean {
        let passed = true;
        //Moving vertically
        if (tarSqr.col === piece.col) {
            //Moving up
            if (tarSqr.row > piece.row) {
                //Each square that is on the same column between start and end.
                board.filter(sq => sq.col === tarSqr.col && (sq.row > piece.row && sq.row < tarSqr.row)).forEach(sq => {
                    if (!sq.empty) passed = false;
                    return;
                });
                return passed;
            }
            //Moving down
            else {
                board.filter(sq => sq.col === tarSqr.col && (sq.row < piece.row && sq.row > tarSqr.row)).forEach(sq => {
                    if (!sq.empty) passed = false;
                    return;
                });
                return passed;
            }
        }
        //Moving horizontally 
        else {
            //Moving left
            if (tarSqr.col < piece.col) {
                board.filter(sq => sq.row === tarSqr.row && (sq.col < piece.col && sq.col > tarSqr.col)).forEach(sq => {
                    if (!sq.empty) passed = false;
                    return;
                });
                return passed;
            }
            //Moving right
            else {
                board.filter(sq => sq.row === tarSqr.row && (sq.col > piece.col && sq.col < tarSqr.col)).forEach(sq => {
                    if (!sq.empty) passed = false;
                    return;
                });
                return passed;
            }
        }
    }
}
