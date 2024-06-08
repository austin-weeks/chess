import {boardArr} from "./squares.ts"
import {PieceType, whitePieces, blackPieces, chessPiece} from "./pieces.ts"
import { useEffect, useState } from "react";

interface GrabState {
    pieceIsGrabbed: boolean
    grabbedPiece: chessPiece | undefined
}

function Chess() {
    const startingGrabState: GrabState = {
        pieceIsGrabbed: false,
        grabbedPiece: undefined
    }
    const [grabbedState, setGrabbedState] = useState(startingGrabState);
    const [isWhiteTurn, setTurn] = useState(true);

    function canMove(row: number, col: number): boolean {
        return true;
    }

    const onClick = (row:number, col: number, hasPiece: boolean) => {
        if (grabbedState.pieceIsGrabbed) {
            if (hasPiece) return;

            if (canMove(row, col)) {
                if (isWhiteTurn) {
                    const piece = whitePieces.find(pc => pc === grabbedState.grabbedPiece);
                        if (!piece) return;
                    piece.row = row;
                    piece.column = col;
                }
                else {
                    const piece = blackPieces.find(pc => pc === grabbedState.grabbedPiece);
                        if (!piece) return;
                    piece.row = row;
                    piece.column = col;

                }

                setGrabbedState(startingGrabState);
                setTurn(prev => !prev);
            } else alert("That is not a valid move! Try moving your piece to a different square.");
        }
        else {
            if (!hasPiece) return;

            let chessPiece;
            if (isWhiteTurn) chessPiece = whitePieces.find(pc => pc.row === row && pc.column === col);
            else chessPiece = blackPieces.find(pc => pc.row === row && pc.column === col);

            setGrabbedState({
                pieceIsGrabbed: true,
                grabbedPiece: chessPiece
            })
        }


    }

    return (
        <>
        <div>Current Turn: {isWhiteTurn ? "White" : "Black"}</div><br />

        <div className="chess-board">
            <MovingPiece showPiece={grabbedState.pieceIsGrabbed}
                icon={getIcon(grabbedState.grabbedPiece)} />
            {boardArr.map(sq => {

                let piece = whitePieces.find(pc => pc.row === sq.row && pc.column === sq.col);
                if (!piece) piece = blackPieces.find(pc => pc.row === sq.row && pc.column === sq.col);

                return (
                    <Square isWhiteTurn={isWhiteTurn}
                        grabbedState={grabbedState}
                        onclick={onClick}
                        isBlackSquare={sq.isBlack}
                        row={sq.row} column={sq.col}
                        piece={piece}
                    />
                );
            })}
        </div>
        </>
    );
}

interface SquareProps {
    isBlackSquare: boolean
    row: number,
    column: number,
    piece: chessPiece | undefined
    onclick: any;
    isWhiteTurn: boolean
    grabbedState: GrabState
}
function Square({ isBlackSquare, row, column, piece, onclick, isWhiteTurn, grabbedState }: SquareProps) {
    const id = `${row}-${column}`

    function selectable(): boolean {
        if (!piece) return false;
        if (isWhiteTurn) return piece.color === "white" ? true : false;
        else return piece.color === "black" ? true : false;
    }
    function showPiece(): boolean {
        if (!piece) return false;
        if (grabbedState.grabbedPiece) return piece !== grabbedState.grabbedPiece
        else return true;
    }

    return (
        <div onClick={() => onclick(row, column, showPiece())}
            style={selectable() ? {cursor: "pointer"} : {}}
            id={id}
            key={id}
            className={isBlackSquare ? "square sq-black" : "square sq-white"} >
            {showPiece() && getIcon(piece)}
        </div>
    );
}

function getIcon(piece: chessPiece | undefined) {
    if (!piece) return (<></>)
    const style = piece.color === "black" ? "fa-solid" : "fa-regular";
    switch (piece.pieceType) {
        case PieceType.Pawn: return (<i className={`${style} fa-chess-pawn`}></i>);
        case PieceType.Bishop: return (<i className={`${style} fa-chess-bishop`}></i>);
        case PieceType.Knight: return (<i className={`${style} fa-chess-knight`}></i>);
        case PieceType.Rook: return (<i className={`${style} fa-chess-rook`}></i>);
        case PieceType.Queen: return (<i className={`${style} fa-chess-queen`}></i>);
        case PieceType.King: return (<i className={`${style} fa-chess-king`}></i>);
    }
}

interface MovingPieceProps {
    icon: JSX.Element,
    showPiece: boolean
}
function MovingPiece({ icon, showPiece }: MovingPieceProps) {
    const [style, setStyle] = useState({
        left: "0",
        top: "0",
        display: showPiece ? "block" : "none"
    })
    useEffect(() => {
        const move = (e: MouseEvent) => {
            console.log(e);
            var x = e.pageX;
            var y = e.pageY;
            setStyle({
                left: x - 15 + "px",
                top: y - 30 + "px",
                display: showPiece ? "block" : "none"
            })};
        //For mouse
        document.addEventListener("mousemove", (e) => {
            move(e);
        });
        return () => document.removeEventListener("mousemove", move);
    });
    return (
        <div className="hover" style={style}>
            {icon}
        </div>
    );
}

export default Chess;