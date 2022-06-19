const createBoard = () => {
    let _board = []

    const board = () => {
        for(let i = 0; i < 9; i++){
            _board.push('')
        }
    }

    board()

    const showBoard = () => {
        const board = document.querySelector('.board')
        _board.forEach((item, index) => {
            const cell = document.createElement('div')
            board.appendChild(cell)
        })
    }

    return {showBoard}
}

const board = createBoard()

board.showBoard()