import "./InfoBtn.css"
import { useState } from "react";

const X = <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>;
const questionMark = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M196,96c0,29.47-24.21,54.05-56,59.06V156a12,12,0,0,1-24,0V144a12,12,0,0,1,12-12c24.26,0,44-16.15,44-36s-19.74-36-44-36S84,76.15,84,96a12,12,0,0,1-24,0c0-33.08,30.5-60,68-60S196,62.92,196,96Zm-68,92a20,20,0,1,0,20,20A20,20,0,0,0,128,188Z"></path></svg>;

function InfoBtn() {
    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <>
            {!infoOpen &&
            <div className="info-btn" onClick={() => setInfoOpen(true)}>
                {questionMark}
            </div> }
            {infoOpen &&
            <div className="info-panel">
                {/* Enter Info Below */}
                Click on a chess piece to grab it. Then, click on a valid square to move. <br />
                    New to Chess? <a target="_blank" href="https://www.chess.com/terms/cheat-sheet-chess">Learn How to Play</a> <br />
                This app does not support online play.
                {/* Enter Info Above */}

                <div className="close-btn" onClick={() => setInfoOpen(false)}>{X}</div>
            </div> }
        </>
    );
}

export default InfoBtn;