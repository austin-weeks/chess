import {boardArr} from "./squares.ts"
import {PieceType, whitePieces, blackPieces} from "./pieces.ts"

function Chess() {

    return (
        <div className="chess-board">
            {boardArr.map(sq => {
                let piece = whitePieces.find(pc => pc.row === sq.row && pc.column === sq.col);
                let isBlack = false;
                if (!piece) {
                    piece = blackPieces.find(pc => pc.row === sq.row && pc.column === sq.col);
                    isBlack = true;
                }
                return (
                    <Square isBlackSquare={sq.isBlack} row={sq.row} column={sq.col} 
                    piece={piece?.pieceType} isBlackPiece={isBlack} />
                );
            })}
        </div>
    );
}

interface SquareProps {
    isBlackSquare: boolean
    row: number,
    column: number,
    piece: PieceType | undefined
    isBlackPiece: boolean
}
function Square({ isBlackSquare, row, column, piece, isBlackPiece }: SquareProps) {
    const id = `${row}-${column}`
    return (
        <div id={id} key={id} className={isBlackSquare ? "square sq-black" : "square sq-white"}>
            {getIcon(piece, isBlackPiece)}
        </div>
    );
}

function getIcon(piece: PieceType | undefined, isBlack: boolean) {
    const style = isBlack ? "fa-solid" : "fa-regular";
    switch (piece) {
        case PieceType.Pawn: 
            return (<i className={`${style} fa-chess-pawn`}></i>);
        case PieceType.Bishop:
            return (<i className={`${style} fa-chess-bishop`}></i>);
        case PieceType.Knight:
            return (<i className={`${style} fa-chess-knight`}></i>);
        case PieceType.Rook:
            return (<i className={`${style} fa-chess-rook`}></i>);
        case PieceType.Queen:
            return (<i className={`${style} fa-chess-queen`}></i>);
        case PieceType.King:
            return (<i className={`${style} fa-chess-king`}></i>);
        default: return ("");
    }
}


export default Chess;