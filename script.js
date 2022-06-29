
const DOM = () => {
    const board = document.querySelector('.board')
    const announce = document.querySelector('.announce')

    const createCell = () => {
        const cell = document.createElement('div')
        cell.className = 'cell'
        board.appendChild(cell)
    }

    const resetDOM = () => {
        const cells = board.querySelectorAll('.cell')
        cells.forEach((cell) => {
            cell.textContent = ''
        })
    }

    const announceTurn = (name) => {
        announce.textContent = ''
        announce.appendChild(createText(`${name}'s turn`))
    }

    const declareWinner = (name) => {
        announce.textContent = ''
        announce.appendChild(createText(`${name}'s Win!`))
    }

    const declareTie = () => {
        announce.textContent = ''
        announce.appendChild(createText(`Tie!`))
    }

    const createText = (text) => {
        const p = document.createElement('p')
        p.className = 'announceText'
        p.textContent = text
        return p
    }

    return {createCell, resetDOM, announceTurn, declareWinner, declareTie}
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
    const playerOne = Player('Player X', 'X')
    const playerTwo = Player('Player O', 'O')
    const {board} = createBoard()
    const {resetDOM, announceTurn, declareWinner, declareTie} = DOM()
    const cells = document.querySelectorAll('.cell')
    let activePlayer = playerOne
    let ThereIsWinner = false
    let turnLeft = 9
    announceTurn(activePlayer.name)

    const declaration = () => {
        if(ThereIsWinner) {
            console.log(`${activePlayer.name} Wins!`)
            gameFinish()
        } else if(turnLeft === 0){ 
            tieGame()
        }   else {
            nextTurn()
        }
    }

    const nextTurn = () => {
        activePlayer == playerOne ? activePlayer = playerTwo: activePlayer = playerOne
        announceTurn(activePlayer.name)
    }

    const setBoardIndex = () => {
        let i = 0
        cells.forEach((cell) => {
            cell.setAttribute('data', i)
            i++
        })
    }
    
    const resetGame = () => {
        board.forEach((item, index, arr) => {
            arr[index] = ''
        })
        ThereIsWinner = false
        turnLeft = 9
        activePlayer = playerOne
    }

    const tieGame = () => {
        declareTie()
    }
    
    const start = () => {
        const resetButton = document.querySelector('.btn-reset')
        setBoardIndex()
        cells.forEach((cell) => cell.addEventListener('click', () => {
            let index = cell.getAttribute('data')
            if(board[index] !== '') return
            if(ThereIsWinner || turnLeft === 0) return
            board[index] = activePlayer.mark
            cell.innerHTML = activePlayer.mark
            turnLeft--
            checkWinner()
            declaration()
        }))

        resetButton.addEventListener('click', () => {
            resetGame()
            resetDOM()
            announceTurn(activePlayer.name)
        })
    }

    const gameFinish = () => {
        declareWinner(activePlayer.name)
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
