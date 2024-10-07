import st from "@components/DrawingPage/DrawingPage.module.scss";
import CustomAvatar from "./CustomAvatar";
import React, {useEffect, useRef, useState} from "react";
import useOutsideDetector from "@components/DrawingPage/useOutsideDetector";
import {SET_UX_VALUE} from "@redux/reducers/util/ux";
import {useDispatch, useSelector} from "react-redux";
import {SET_SESSION_NICKNAME} from "@redux/reducers/draw/name";
import {RootState} from "@redux/reducers";

export default ({  children = null }) => {
    const dispatch = useDispatch()
    const avatarContainerRef = useRef(null)
    useOutsideDetector(avatarContainerRef, () => {
        dispatch({ type: SET_UX_VALUE,
            key: 'profileModalActive', value: false})
    })

    const sessionNickname = useSelector((state: RootState) => state.name.sessionNickname)
    const players = useSelector((state: RootState) => state.name.players)

    const [ inputValue, setInputValue] = useState(sessionNickname)

    useEffect(() => {
        setInputValue(sessionNickname)
    }, [sessionNickname])

    let clientRef = useRef(null)



    return <div className={st.topNav}>
        <div className={st.topNav_row}>
            <span> Painted By: </span>
            <input className={st.topNav_input} onChange={event =>  setInputValue(event.target.value)}
                   onBlur={() => {
                       if(inputValue !== ""){
                           dispatch({type: SET_SESSION_NICKNAME, sessionNickname: inputValue})
                       }
                   }}
                   value={inputValue}
                   defaultValue={sessionNickname}/>
            <div className={st.topNav_row}>
                <span> Other Painters: </span>
                {
                    Object.keys(players).filter(k => k !== sessionNickname).map(k => players[k])
                        .map( player => <div>
                        <span className={st.playerName}>{player.sessionNickname}</span>
                    </div>)
                }
            </div>
        </div>


        <div ref={avatarContainerRef} className={st.avatarContainer}>
            <CustomAvatar/>
        </div>
    </div>
}