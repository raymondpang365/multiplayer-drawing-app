import st from "@components/DrawingPage/DrawingPage.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ActionTypes } from "@redux/type";
import {RootState} from "@redux/store";

interface Player {
    sessionNickname: string;
}


const DrawingPage: React.FC = () => {

    const dispatch = useDispatch()

    const sessionNickname = useSelector((state: RootState) => state.canvasState.sessionNickname)
    const players = useSelector((state: RootState) => state.canvasState.players)

    const [ inputValue, setInputValue] = useState<string>(sessionNickname)

    useEffect(() => {
        setInputValue(sessionNickname)
    }, [sessionNickname])



    return <div className={st.topNav}>
        <div className={st.topNav_row}>
            <span> Painted By: </span>
            <input className={st.topNav_input} onChange={event =>  setInputValue(event.target.value)}
                   onBlur={() => {
                       if(inputValue !== ""){
                           dispatch({type: ActionTypes.SET_SESSION_NICKNAME, sessionNickname: inputValue})
                       }
                   }}
                   value={inputValue}
                   defaultValue={sessionNickname}/>
                    <div className={st.topNav_row}>
                        <span> Online Painters: </span>
                        {
                            Object.keys(players).filter(k => k !== sessionNickname).map(k => players[k])
                                .map( (player : Player) => <div>
                                <span className={st.playerName}>{player.sessionNickname}</span>
                            </div>)
                        }
                    </div>
        </div>
    </div>
}

export default DrawingPage