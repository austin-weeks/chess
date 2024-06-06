import {boardArr, square} from "./squares.ts"
function Chess() {
    return (
        <div className="chess-board">
            {boardArr.map(el => {
                return (
                    <Square isBlack={el.isBlack} id={el.id} />
                );
            })}
        </div>
    );
}

function Square({ isBlack, id }: square) {
    return (
        <div id={id} key={id} className={isBlack ? "square sq-black" : "square sq-white"}>
            {id}
        </div>
    );
}



export default Chess;