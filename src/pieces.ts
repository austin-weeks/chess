export enum PieceType { Pawn, Rook, Knight, Bishop, Queen, King }
export interface chessPiece {
    pieceType: PieceType
    row: number
    column: number
}
export const whitePieces: chessPiece[] = [
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 1
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 2
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 3
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 4
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 5
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 6
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 7
    },
    {
        pieceType: PieceType.Pawn,
        row: 2,
        column: 8
    },
    {
        pieceType: PieceType.Rook,
        row: 1,
        column: 1
    },
    {
        pieceType: PieceType.Knight,
        row: 1,
        column: 2
    },
    {
        pieceType: PieceType.Bishop,
        row: 1,
        column: 3
    },
    {
        pieceType: PieceType.Queen,
        row: 1,
        column: 4
    },
    {
        pieceType: PieceType.King,
        row: 1,
        column: 5
    },
    {
        pieceType: PieceType.Bishop,
        row: 1,
        column: 6
    },
    {
        pieceType: PieceType.Knight,
        row: 1,
        column: 7
    },
    {
        pieceType: PieceType.Rook,
        row: 1,
        column: 8
    }
]

export const blackPieces: chessPiece[] = [
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 1
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 2
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 3
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 4
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 5
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 6
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 7
    },
    {
        pieceType: PieceType.Pawn,
        row: 7,
        column: 8
    },
    {
        pieceType: PieceType.Rook,
        row: 8,
        column: 1
    },
    {
        pieceType: PieceType.Knight,
        row: 8,
        column: 2
    },
    {
        pieceType: PieceType.Bishop,
        row: 8,
        column: 3
    },
    {
        pieceType: PieceType.Queen,
        row: 8,
        column: 4
    },
    {
        pieceType: PieceType.King,
        row: 8,
        column: 5
    },
    {
        pieceType: PieceType.Bishop,
        row: 8,
        column: 6
    },
    {
        pieceType: PieceType.Knight,
        row: 8,
        column: 7
    },
    {
        pieceType: PieceType.Rook,
        row: 8,
        column: 8
    }
]
