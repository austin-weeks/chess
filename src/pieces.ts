export enum PieceType { Pawn, Rook, Knight, Bishop, Queen, King }
export interface chessPiece {
    pieceType: PieceType
    row: number
    col: number
    color: "white" | "black"
}
export const whitePieces: chessPiece[] = [
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 1,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 2,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 3,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 4,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 5,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 6,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 7,
        color: "white"
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        col: 8,
        color: "white"
    },
    {
        pieceType: PieceType.Rook,
        row: 1,
        col: 1,
        color: "white"
    },
    {
        pieceType: PieceType.Knight,
        row: 1,
        col: 2,
        color: "white"
    },
    {
        pieceType: PieceType.Bishop,
        row: 1,
        col: 3,
        color: "white"
    },
    {
        pieceType: PieceType.Queen,
        row: 1,
        col: 4,
        color: "white"
    },
    {
        pieceType: PieceType.King,
        row: 1,
        col: 5,
        color: "white"
    },
    {
        pieceType: PieceType.Bishop,
        row: 1,
        col: 6,
        color: "white"
    },
    {
        pieceType: PieceType.Knight,
        row: 1,
        col: 7,
        color: "white"
    },
    {
        pieceType: PieceType.Rook,
        row: 1,
        col: 8,
        color: "white"
    }
]

export const blackPieces: chessPiece[] = [
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 1,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 2,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 3,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 4,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 5,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 6,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 7,
        color: "black"
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        col: 8,
        color: "black"
    },
    {
        pieceType: PieceType.Rook,
        row: 8,
        col: 1,
        color: "black"
    },
    {
        pieceType: PieceType.Knight,
        row: 8,
        col: 2,
        color: "black"
    },
    {
        pieceType: PieceType.Bishop,
        row: 8,
        col: 3,
        color: "black"
    },
    {
        pieceType: PieceType.Queen,
        row: 8,
        col: 4,
        color: "black"
    },
    {
        pieceType: PieceType.King,
        row: 8,
        col: 5,
        color: "black"
    },
    {
        pieceType: PieceType.Bishop,
        row: 8,
        col: 6,
        color: "black"
    },
    {
        pieceType: PieceType.Knight,
        row: 8,
        col: 7,
        color: "black"
    },
    {
        pieceType: PieceType.Rook,
        row: 8,
        col: 8,
        color: "black"
    }
]
