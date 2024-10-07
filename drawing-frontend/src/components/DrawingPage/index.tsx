import React from 'react'
import Head from "./misc/Head";
import st from './DrawingPage.module.scss'
import Canvas from "./canvas/Canvas";


export default function DrawingPage({
                                    }){
    return (
        <div style={{'height': '100%'}}>
            <style jsx global>{`
      body {
        margin: 0;
        overflow-x: hidden !important;
        overflow-y: auto;
        height: 100%;
        width: 100%;
       
      }
      html,
      body {
        margin: 0;
        height: 100%;
      }
      #__next {
        background: #fff;
        height: 100%;
      }
      @media only screen and (max-width: 600px){
        body > div{
          overflow-x: hidden;
          // ccc
        }
      }
    `}</style>
            <Head title={'Drawing App By HKSEA x Raymond'}/>
            <main className={st.app}>
                <Canvas/>
            </main>
        </div>
    )
}
