import {boardArr, square} from "./squares.ts"
import {PieceType, whitePieces, blackPieces, chessPiece} from "./pieces.ts"
import { useEffect, useReducer, useState } from "react";
import { canMove } from "./GameLogic.ts";
import { sound } from "./sound.ts";
import InfoBtn from "./InfoBtn/InfoBtn.tsx";

const board = boardArr;
/*
TODO
- drag and drop feature ?
- disable scroll while in chess area
    - still not working on mobile - if i just fix the size of the board this should solve?

- rework for performance? 
    - currently entire board re-renders every click

- pawn to queen transformation

BUG - black pawns could move backwards one space
*/



interface GrabState {
    pieceIsGrabbed: boolean
    grabbedPiece: chessPiece | undefined
}
enum GameWinState { None, White, Black }

function Chess() {
    const [, forceRefresh] = useReducer(x => x + 1, 0);
    const startingGrabState: GrabState = {
        pieceIsGrabbed: false,
        grabbedPiece: undefined
    }
    const [grabbedState, setGrabbedState] = useState(startingGrabState);
    const [isWhiteTurn, setTurn] = useState(true);
    const [winState, setWinState] = useState(GameWinState.None);

    const blankPieceArray: chessPiece[] = [];
    const [capturedWhite, setCapturedWhite] = useState(blankPieceArray);
    const [capturedBlack, setCapturedBlack] = useState(blankPieceArray);
    const [isFlipped, setFlipped] = useState(false);

    useEffect(() => {
        document.body.style.cursor = grabbedState.pieceIsGrabbed ? "grabbing" : "default";
    }, [grabbedState.pieceIsGrabbed]);

    function flipBoard() {
        board.reverse();
        forceRefresh();
        setFlipped(prev => !prev);
    }

    const onUserClick = (square: square, sqPiece: chessPiece | undefined) => {
        //If game is won do nothing
        if (winState !== GameWinState.None) return;

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
            
            if (heldPiece === sqPiece) {
                setGrabbedState(startingGrabState);
                sound.grab();
            }
            if (heldPiece.color === sqPiece?.color) return;
            if (canMove(square, heldPiece, board)) {
                heldPiece.col = square.col;
                heldPiece.row = square.row;
                setGrabbedState(startingGrabState);
                
                //Deleting captured pieces.
                if (sqPiece) {
                    if (sqPiece.pieceType === PieceType.King) {
                        setWinState(isWhiteTurn ? GameWinState.White : GameWinState.Black);
                    }
                    sqPiece.row = 0;
                    sqPiece.col = 0;
                    sound.capture();
                    console.log("captured!");
                    if (sqPiece.color === "white") setCapturedWhite(prev => {
                        const n = prev.slice();
                        n.push(sqPiece);
                        return n;
                    });
                    else setCapturedBlack(prev => {
                        const n = prev.slice();
                        n.push(sqPiece);
                        return n;
                    });
                        
                } else sound.place();
                //Setting Turn info
                setTurn(prev => !prev);
            } else {
                sound.invalid();
            };
        }
        //User is selecting a chess piece.
        else {
            if (!sqPiece) return;

            let chessPiece;
            if (isWhiteTurn) chessPiece = whitePieces.find(pc => pc.row === square.row && pc.col === square.col);
            else chessPiece = blackPieces.find(pc => pc.row === square.row && pc.col === square.col);
            if (!chessPiece) return;
            
            sound.grab();

            setGrabbedState({
                pieceIsGrabbed: true,
                grabbedPiece: chessPiece
            })
        }
    }

    return (
        <>
        <GameInfo isWhiteTurn={isWhiteTurn} winState={winState} flipBoard={flipBoard} />
        <div className="game-display">
            <CapturedPieces pieces={capturedWhite} isWhite={!isFlipped} />
            <div className="chess-board">
                <MovingPiece showPiece={grabbedState.pieceIsGrabbed}
                    icon={getIcon(grabbedState.grabbedPiece)} />
                {board.map(sq => {
                    let piece = whitePieces.find(pc => pc.row === sq.row && pc.col === sq.col);
                    if (!piece) piece = blackPieces.find(pc => pc.row === sq.row && pc.col === sq.col);
                    
                    return (
                        <Square isWhiteTurn={isWhiteTurn}
                        grabbedState={grabbedState}
                        gameOver={winState !== GameWinState.None}
                        onclick={onUserClick}
                        square={sq}
                        piece={piece}
                        />
                    );
                })}
            </div>
            <CapturedPieces pieces={capturedBlack} isWhite={isFlipped} />
        </div>
        <InfoBtn />
        </>
    );
}

interface SquareProps {
    square: square
    piece: chessPiece | undefined
    onclick: any;
    isWhiteTurn: boolean
    grabbedState: GrabState
    gameOver: boolean
}
function Square({ square, piece, onclick, isWhiteTurn, grabbedState, gameOver }: SquareProps) {
    const id = `${square.row}-${square.col}`

    function selectable(): boolean {
        if (gameOver) return false;
        if (grabbedState.pieceIsGrabbed) return false;
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
            style={selectable() ? {cursor: "grab"} : {}}
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
        document.addEventListener("mousemove", move);
        document.addEventListener("click", move);
            
        return () =>{
            document.removeEventListener("mousemove", move);
            document.removeEventListener("click", move);
        }
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
    flipBoard: () => void
}
function GameInfo({ winState, isWhiteTurn, flipBoard }: GameStateProps) {
    function GameState() {
        if (winState === GameWinState.None) {
            return (
                <>
                    <div className="game-status">{isWhiteTurn ? "White's Turn" : "Black's Turn"}</div>
                    <br />
                </>
            );
        } else {
            return (
                <>
                    <div className="game-status">{winState === GameWinState.White ? "White Won!" : "Black Won!"}</div>
                    <br />
                </>
            );
        }
    }

    function ResetBtn() {
        return (
            <div className="btn" onClick={() => window.location.reload()}>
                Reset Game
            </div>
        );
    }
    function FlipBtn() {
        return (
            <div className="btn" onClick={flipBoard}>
                Flip Board
            </div>
        );
    }

    return (
        <div className="game-info">
            <GameState />
            <div style={{display: "flex", gap: ".7em", alignItems: "center"}}>
                <ResetBtn />
                <FlipBtn />
            </div>
        </div>
    );
}

interface CapturedPiecesProps {
    pieces: chessPiece[]
    isWhite: boolean
}
function CapturedPieces({pieces, isWhite}: CapturedPiecesProps) {
    return (
        <div className="captured-pieces" style={isWhite ? {} : {justifyContent: "flex-end"}}>
            <div className={isWhite ? "captured-inner" : "captured-inner inner-reverse"}>
                {pieces.sort((a, b) => a.pieceType - b.pieceType).map(pc => {
                    return getIcon(pc);
                })}
            </div>
        </div>
    );
}

export default Chess;