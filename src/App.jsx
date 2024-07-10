import React, { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  'X': 'Player1',
  'O': 'Player2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function derievedActivePlayers(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function derievedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player
  }
  return gameBoard;
}

function derievedWinner(gameBoard, playerName) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }
  return winner;
}





const App = () => {

  //const [activePlayer,setActivePlayer]=useState('X')

  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  //let gameBoard = initialGameBoard;


  const activePlayer = derievedActivePlayers(gameTurns)
  const gameBoard = derievedGameBoard(gameTurns);
  const winner = derievedWinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {

    //setActivePlayer((currentActivePlayer)=>currentActivePlayer ==='X' ?'O':'X');


    setGameTurns((prevGameTurns) => {
      //const currentPlayer='X'
      //if (prevGameTurns.length >0 && prevGameTurn[0].player==='X')
      // if (prevGameTurn[0].player==='X') {
      //   currentPlayer='O'
      // }
      const currentPlayer = derievedActivePlayers(prevGameTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
      return updatedTurns;
    });
  }

    function handleRematch() {
      setGameTurns([]);
    }


    function handlePlayerNameChange(symbol, newName) {
    setPlayerName(prevPlayers=>({
      ...prevPlayers,
        [symbol]: newName
    }
    ))
  }
  

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange} />

          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard
          onSelectSquare={handleSelectSquare} board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;