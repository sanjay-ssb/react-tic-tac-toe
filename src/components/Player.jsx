import React, { useState } from 'react'

const Player = ({ initialName, symbol ,isActive,onChangeName}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setplayerName] = useState(initialName)

    const onEditHandler = () => {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol,playerName)
        }
    }
    const nameChangeHandler=(event)=>setplayerName(event.target.value);

    let editablePlayerName = <span className='player-name'>{playerName}</span>
    if (isEditing) {
        editablePlayerName = <span><input type='text' required value={playerName} onChange={nameChangeHandler}></input></span>
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
            <button 
            onClick={onEditHandler}
            
            >{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}

export default Player