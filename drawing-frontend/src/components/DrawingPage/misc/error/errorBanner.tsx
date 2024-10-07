import React from 'react'
import st from './notFound.module.scss'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import classNames from 'classnames';
import {RootState} from '@redux/reducers';

export default function ErrorBanner(){

  const router = useRouter();
  const dispatch = useDispatch()

  const abnormalError = useSelector((state:RootState) => state.ux.abnormalError);

  const cancelError = () => {
    router.reload()
  }

  return <div
    className={abnormalError != null ? st.errorBanner : classNames(st.errorBanner, st.hidden)}
  >
    <div className={st.bigMessage}>
      {
        abnormalError != null ? abnormalError.map(e => <div>
            <h5 className={st.bigCode}> {e.status} </h5>
            <h5 className={st.bigCode}> {e.code} </h5>
            <p className={st.help}> { JSON.stringify(e.msg) } </p>
            <p className={st.help}> { JSON.stringify(e.devMsg) } </p>
          </div>
        ) : null
      }
      <button className={st.backButton} onClick={cancelError }>
        <u>Refresh Page</u>
      </button>
    </div>
  </div>
}
