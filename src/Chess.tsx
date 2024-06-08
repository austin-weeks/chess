import {boardArr, square} from "./squares.ts"
import {PieceType, whitePieces, blackPieces, chessPiece} from "./pieces.ts"
import { useEffect, useState } from "react";
import { canMove } from "./canMove.tsx";

interface GrabState {
    pieceIsGrabbed: boolean
    grabbedPiece: chessPiece | undefined
}
enum GameWinState { None, White, Black }

function Chess() {
    const startingGrabState: GrabState = {
        pieceIsGrabbed: false,
        grabbedPiece: undefined
    }
    const [grabbedState, setGrabbedState] = useState(startingGrabState);
    const [isWhiteTurn, setTurn] = useState(true);
    const [winState, setWinState] = useState(GameWinState.None);


    const onUserClick = (square: square, sqPiece: chessPiece | undefined) => {
        //User is holding a chess piece.
        if (grabbedState.pieceIsGrabbed) {
            let heldPiece;
            if (isWhiteTurn) {
                heldPiece = whitePieces.find(pc => pc === grabbedState.grabbedPiece);
                if (!heldPiece) return;
            } else {
                heldPiece = blackPieces.find(pc => pc === grabbedState.grabbedPiece);
                if (!heldPiece) return;
            }
            
            if (heldPiece.color === sqPiece?.color) return;
            if (canMove(square, heldPiece, boardArr)) {
                heldPiece.column = square.col;
                heldPiece.row = square.row;
                setGrabbedState(startingGrabState);
                
                //Deleting captured pieces.
                if (sqPiece) {
                    if (sqPiece.pieceType === PieceType.King) {
                        setWinState(isWhiteTurn ? GameWinState.White : GameWinState.Black);
                    }
                    sqPiece.row = 0;
                    sqPiece.column = 0;
                }
                //Setting Turn info
                setTurn(prev => !prev);
            } else return;
        }
        //User is selecting a chess piece.
        else {
            if (!sqPiece) return;

            let chessPiece;
            if (isWhiteTurn) chessPiece = whitePieces.find(pc => pc.row === square.row && pc.column === square.col);
            else chessPiece = blackPieces.find(pc => pc.row === square.row && pc.column === square.col);
            if (!chessPiece) return;

            setGrabbedState({
                pieceIsGrabbed: true,
                grabbedPiece: chessPiece
            })
        }


    }

    return (
        <>
        <GameState isWhiteTurn={isWhiteTurn} winState={winState} />
        <div className="chess-board">
            <MovingPiece showPiece={grabbedState.pieceIsGrabbed}
                icon={getIcon(grabbedState.grabbedPiece)} />
                {boardArr.map(sq => {
                    let piece = whitePieces.find(pc => pc.row === sq.row && pc.column === sq.col);
                    if (!piece) piece = blackPieces.find(pc => pc.row === sq.row && pc.column === sq.col);

                    return (
                        <Square isWhiteTurn={isWhiteTurn}
                            grabbedState={grabbedState}
                            onclick={onUserClick}
                            square={sq}
                            piece={piece}
                        />
                    );
                })}
        </div>
        </>
    );
}

interface SquareProps {
    square: square
    piece: chessPiece | undefined
    onclick: any;
    isWhiteTurn: boolean
    grabbedState: GrabState
}
function Square({ square, piece, onclick, isWhiteTurn, grabbedState }: SquareProps) {
    const id = `${square.row}-${square.col}`

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

    square.empty = !showPiece();

    return (
        <div onClick={() => onclick(square, piece)}
            style={selectable() ? {cursor: "pointer"} : {}}
            id={id}
            key={id}
            className={square.isBlack ? "square sq-black" : "square sq-white"} >
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

interface GameStateProps {
    winState: GameWinState
    isWhiteTurn: boolean
}
function GameState({ winState, isWhiteTurn }: GameStateProps) {
    if (winState === GameWinState.None) {
        return (
            <>
                <div>{isWhiteTurn ? "White's Turn" : "Black's Turn"}</div>
                <br />
            </>
        );
    } else {
        return (
            <>
                <div>{winState === GameWinState.White ? "White Won!" : "Black Won!"}</div>
                <br />
            </>
        );
    }
}

export default Chess;