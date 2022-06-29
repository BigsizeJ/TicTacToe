
const DOM = () => {
    const board = document.querySelector('.board')
    
    const createCell = () => {
        const cell = document.createElement('div')
        cell.className = 'cell'
        board.appendChild(cell)
    }

    const reset = () => {
        const cells = board.querySelectorAll('.cell')
        cells.forEach((cell) => {
            cell.textContent = ''
        })
    }

    return {createCell, reset}
}

const Player = (name, mark) => {
    return {name, mark}
}

const createBoard = () => {
    let board = ['', '', '', '', '', '', '', '', '']
    
    for(let i = 0; i < board.length; i++) {
        const {createCell} = DOM()
        createCell()
    }

    return { board }
}

const gameBoard = (() => {
    const {board} = createBoard()
    const {reset} = DOM()
    const cells = document.querySelectorAll('.cell')
    const playerOne = Player('jessie', 'X')
    const playerTwo = Player('bryce', 'O')
    let activePlayer = playerOne
    let ThereIsWinner = false
    let turnLeft = 9

    const declaration = () => {
        if(ThereIsWinner) {
            console.log(`${activePlayer.name} Wins!`)
            gameFinish()
        } else if(turnLeft === 0){ 
            console.log('Tie!')
        }   else {
            nextTurn()
        }
        

    }

    const nextTurn = () => {
        activePlayer == playerOne ? activePlayer = playerTwo: activePlayer = playerOne
    }

    const setBoardIndex = () => {
        let i = 0
        cells.forEach((cell) => {
            cell.setAttribute('data', i)
            i++
        })
    }

    
    const resetBoard = () => {
        board.forEach((item, index, arr) => {
            arr[index] = ''
        })
        ThereIsWinner = false
        turnLeft = 9
    }
    
    const start = () => {
        setBoardIndex()
        cells.forEach((cell) => cell.addEventListener('click', () => {
            let index = cell.getAttribute('data')
            if(board[index] !== '') return
            board[index] = activePlayer.mark
            console.log(board[index])
            cell.innerHTML = activePlayer.mark
            checkWinner()
            turnLeft--
            declaration()
        }))

    }

    const gameFinish = () => {
        resetBoard()
        reset()
    }

    const checkWinner = () => {
        const winnerRules = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],    
            [2,4,6]
        ]
        winnerRules.forEach((row) => {
            if(board[row[0]] === activePlayer.mark && board[row[1]] === activePlayer.mark && board[row[2]] === activePlayer.mark) {
                ThereIsWinner = true
           
            }
        })
    }
    start()
})()
