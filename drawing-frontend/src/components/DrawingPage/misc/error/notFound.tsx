import React from 'react'
import st from './notFound.module.scss'
import {useRouter} from "next/router";

export default function NotFound({text}){

  const router = useRouter();

  return <div className={st.notFoundPage}>
    <div className={st.bigMessage}>
      <span className={st.bigCode}>404</span>
      <span className={st.bigWord}>{text}</span>
      <div className={st.help}>
       <p>
        If you need further help, we can answer your question from
        <a href="mailto:support@classy5home.com"> support@classy5home.com</a>
      </p>
      </div>
      <button className={st.backButton} onClick={() => router.back()}>
        <u>Back</u>
      </button>
    </div>
  </div>
}