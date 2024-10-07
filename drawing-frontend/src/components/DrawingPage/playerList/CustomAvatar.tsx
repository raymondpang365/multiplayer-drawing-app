import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {SET_UX_VALUE} from "@redux/reducers/util/ux";
import {RootState} from '@redux/reducers';
import styles from "./profileModal.module.scss";
import {useRouter} from "next/router";
import Avatar from 'react-avatar';
export default function CustomAvatar() {

  const dispatch = useDispatch();
  const profileModalActive = useSelector((state: RootState) => state.ux.profileModalActive)

    const cookie = useSelector((state: RootState) => state.cookie)
    const token = cookie.token
    const isLoggedIn = token != null
    const [ email, setEmail ] = useState('')

    const router = useRouter()

    useEffect(() => {
        if(token != null) {
            const _email = cookie.info == null ? null : cookie.info.email
            setEmail(_email)
        }
    }, [token])

  return <>
      { isLoggedIn ?
        <>
          <div className={styles.main} onClick={() => dispatch({ type: SET_UX_VALUE,
          key: 'profileModalActive', value: !profileModalActive})}>
              <Avatar name={email} round={true} size="40" />
          </div>
            {  profileModalActive ?  <div className={styles.profileModalContainer}>
                <div>
                    <div className={styles.userHead}>
                        <button
                            className={styles.userImgContainer}>
                            <Avatar name={email} round={true} size="40" />
                            {/*<ProfileIcon size={'40px'} borderRadius={'20px'}/>*/}
                        </button>
                        <div className={styles.usernameContainer}>
                            <h4 className={styles.welcome}>Welcome </h4>
                            <h4 className={styles.username}>{email}</h4>
                        </div>
                    </div>
                </div>
            </div> : null }
        </>
        : null
      }
  </>
}
