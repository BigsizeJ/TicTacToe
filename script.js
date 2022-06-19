const __main__ = (() => {
    let board = []

    for(let i = 0; i < 9; i++){
        board.push('')
    }



   

    const gameBoard = () => {
        const _board_ = document.querySelector('.board')

        board.forEach((item, index) => {
            const cell = document.createElement('div')

            _board_.appendChild(cell)

        })

        Array.from(_board_.children).forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if(board[index] == ''){
                    board[index] = 'X'
               
                }
                else{
                    return
                }
                
                cell.style.backgroundColor = 'red'
                checkWinner()
            })
        })
    }

    const checkWinner = () => {
        const RULES = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ]

        RULES.forEach((item, index) => {
            if(board[item[0]] == 'X' & board[item[1]] == 'X' & board[item[2]] == 'X'){
                console.log('win')
            }
        })
    }



    const play = () => {
        gameBoard()
    }

    return {play};
})();
