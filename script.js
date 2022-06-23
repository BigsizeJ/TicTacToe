const GameBoard = (() => {
    let board = ['','','','','','','','','']

    const createBoard = () => {
        board.forEach(() => {
            const cell = document.createElement('div')
            const boardElement = document.querySelector('.board')
            boardElement.appendChild(cell)
        })
    }
    return {createBoard}
})()


const GameStart = (() => {
    const {createBoard} = GameBoard()
    createBoard()
})()