export enum PieceType { Pawn, Rook, Knight, Bishop, Queen, King }
export interface chessPiece {
    pieceType: PieceType
    row: number
    column: number
    color: "white" | "black"
}
export const whitePieces: chessPiece[] = [
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 1,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 2,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 3,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 4,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 5,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 6,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 7,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 8,
        color: "white"
    },
    {
        pieceType: PieceType.Rook,
        row: 1,
        column: 1,
        color: "white"
    },
    {
        pieceType: PieceType.Knight,
        row: 1,
        column: 2,
        color: "white"
    },
    {
        pieceType: PieceType.Bishop,
        row: 1,
        column: 3,
        color: "white"
    },
    {
        pieceType: PieceType.Queen,
        row: 1,
        column: 4,
        color: "white"
    },
    {
        pieceType: PieceType.King,
        row: 1,
        column: 5,
        color: "white"
    },
    {
        pieceType: PieceType.Bishop,
        row: 1,
        column: 6,
        color: "white"
    },
    {
        pieceType: PieceType.Knight,
        row: 1,
        column: 7,
        color: "white"
    },
    {
        pieceType: PieceType.Rook,
        row: 1,
        column: 8,
        color: "white"
    }
]

export const blackPieces: chessPiece[] = [
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 1,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 2,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 3,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 4,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 5,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 6,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 7,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 8,
        color: "black"
    },
    {
        pieceType: PieceType.Rook,
        row: 8,
        column: 1,
        color: "black"
    },
    {
        pieceType: PieceType.Knight,
        row: 8,
        column: 2,
        color: "black"
    },
    {
        pieceType: PieceType.Bishop,
        row: 8,
        column: 3,
        color: "black"
    },
    {
        pieceType: PieceType.Queen,
        row: 8,
        column: 4,
        color: "black"
    },
    {
        pieceType: PieceType.King,
        row: 8,
        column: 5,
        color: "black"
    },
    {
        pieceType: PieceType.Bishop,
        row: 8,
        column: 6,
        color: "black"
    },
    {
        pieceType: PieceType.Knight,
        row: 8,
        column: 7,
        color: "black"
    },
    {
        pieceType: PieceType.Rook,
        row: 8,
        column: 8,
        color: "black"
    }
]
