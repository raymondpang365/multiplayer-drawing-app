import React, {useRef, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import st from "./canvas.module.scss"
import {useRouter} from "next/router";
import SockJsClient from "react-stomp";
import templateSt from "@components/DrawingPage/DrawingPage.module.scss"
import useGridLine from "./grid/useGridLine";
import dynamic from "next/dynamic";
import {Slider} from "rsuite";
import 'rsuite/Slider/styles/index.css';
import classNames from "classnames";
import useOnPressEsc from "./util/useOnPressEsc";
import {RootState} from "@redux/reducers";
import useOutsideDetector from "@components/DrawingPage/useOutsideDetector";
import { SET_PLAYERS, SET_SESSION_ID } from "@redux/reducers/draw/name";
import {
    handleCanvasDragEndHof,
    handleCanvasDragHof,
    handleCanvasDragStartHof
} from "@components/DrawingPage/canvas/util/canvasNavigation";
import TopNav from "@components/DrawingPage/playerList/TopNav";
import drawLine from "@components/DrawingPage/canvas/util/drawLine";
import {  PaletteIcon, PencilIcon, EraserIcon, CursorIcon } from "./icons"
import useScrollByWheelHandler from "@components/DrawingPage/canvas/util/useScrollByWheelHandler";
import config from "@config"

const Sketch = dynamic(() => import('@uiw/react-color').then(mod => mod.Sketch), {
    ssr: false
});

export const tools = {
    PENCIL: "pencil",
    ERASER: "eraser",
    DEFAULT: "default"
}



const ToolIcon = ({_selectedTool, _thickness, _color }) => {
    switch (_selectedTool) {
        case tools.ERASER:
            return       <div className={st.eraser_cursor}
                              style={{backgroundColor:"#fff", height: _thickness,
                                  width: _thickness }}/>
        case tools.PENCIL:
            return <div className={st.eraser_cursor}
                        style={{backgroundColor: _color, height: _thickness,
                            width: _thickness }}/>
        default:
            return <CursorIcon/>

    }
}

const Canvas = () => {
    const router = useRouter();
    const [imageHeight, setImageHeight] = useState(1080)
    const [imageWidth, setImageWidth] = useState(1920)
    const canvasRef = useRef(null)

    const dispatch = useDispatch()

    const [zx, setZx] = useState(1)
    const [color, setColor] = useState("#000");

    const [isMouseDown, setIsMouseDown] = useState(false)

    const sessionId = useSelector((state: RootState) => state.name.sessionId)
    const sessionNickname = useSelector((state: RootState) => state.name.sessionNickname)

    let clientRef = useRef(null);

    const [ connected, setConnected] = useState(false)

    useEffect(() => {
        if(connected){
            clientRef.sendMessage(
                "/ws.new_session",
                true
            )
        }
    }, [connected])


    const onMouseDown = (event) => {
        if(sessionId == null) return

        setIsMouseDown(true)
        const bounds = event.target.getBoundingClientRect();
        console.log([event.clientX, event.clientY, bounds.left, bounds.top])
        const x = (event.clientX - bounds.left) / zx;
        const y = (event.clientY - bounds.top) / zx;
        setLastPosition({x, y})
    }

    const canvas = canvasRef.current;

    const [pencilThickness, setPencilThickness] = useState(6)
    const [eraserThickness, setEraserThickness] = useState(6)

    const [lastPosition, setLastPosition] = useState({x: 0, y: 0});

    const [selectedTool, setSelectedTool] = useState(tools.DEFAULT)

    const draggableRef = useRef(null)
    const isInitialized = useRef(false);
    const mouseCoords = useRef({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
    });

    useOnPressEsc(() => {
        setSelectedTool(tools.DEFAULT)
    })

    useScrollByWheelHandler({ zx, setZx, draggableRef })

    useEffect(() => {
        if (draggableRef.current && !isInitialized.current) {
            isInitialized.current = true;
            setTimeout(() => {
                draggableRef.current.scrollTop = 150;
                draggableRef.current.scrollLeft = 150;
            }, 100);
        }
    }, [draggableRef.current]);

    const handleMouseUp = (event) => {
        setIsMouseDown(false)
    }


    const handleDrag = (event) => {
        if(sessionId == null) return

        const bounds = event.target.getBoundingClientRect();
        console.log([event.clientX, event.clientY, bounds.left, bounds.top])
            const offsetX = (event.clientX - bounds.left) / zx;
            const offsetY = (event.clientY - bounds.top) / zx;
            const {x, y} = lastPosition;
            const action = {
                selectedTool: selectedTool,
                isMouseDown: isMouseDown,
                x1: x,
                y1: y,
                x2: offsetX,
                y2: offsetY,
                color: color,
                sessionId: sessionId,
                sessionNickname: sessionNickname,
                thickness: selectedTool === tools.PENCIL ? pencilThickness : eraserThickness,
                time: Date.now()
            };
            if (clientRef != null) {
                // @ts-ignore
                // window.alert(JSON.stringify(action))
                clientRef.sendMessage(
                    "/ws.draw",
                    JSON.stringify(action)
                )
            }
        if(isMouseDown && selectedTool !== tools.DEFAULT) {
            setLastPosition({x: offsetX, y: offsetY});
        }
    }

    const colorPickerRef = useRef(null)

    useOutsideDetector(colorPickerRef, () => {
        if(colorPickerRef != null) {
            setPaletteActive(false)
        }
    })

    const bg = useGridLine()

    const [ paletteActive, setPaletteActive ] = useState(false)

    const players = useSelector((state: RootState) => state.name.players)



    console.log(players)


    return (
        <div className={templateSt.verticalSplit}>
            <TopNav/>
            <div className={templateSt.reportContainer}>
                <div className={templateSt.page}>
                    <div className={templateSt.reportContentWrapper}>
                        <SockJsClient url={`${config.apiUrl}/ws`}
                                      onConnect={() => {
                                          setConnected(true)
                                      }
                        }

                                      topics={[
                            `/topic/draw`, `/topic/new_session`]}

                                      onMessage={(msg, topic) => {
                                          if(topic === `/topic/new_session`){
                                              dispatch({
                                                  type: SET_SESSION_ID,
                                                  sessionId: msg.sessionId
                                              })
                                              console.log(msg)
                                              const image = new Image();
                                              image.onload = () => {
                                                  const context = canvas.getContext('2d');

                                                  canvas.width = image.width;
                                                  canvas.height = image.height;

                                                  context.drawImage(image, 0, 0);
                                              };

                                              image.src = msg.base64Image;
                                          }
                                          else if(topic === `/topic/draw`) {
                                              // window.alert(JSON.stringify(msg))
                                              if (canvas != null) {
                                                  const ctx = canvas.getContext('2d');
                                                  if (msg.isMouseDown && msg.selectedTool !== tools.DEFAULT) {
                                                      drawLine({
                                                          ctx: ctx,
                                                          x1: msg.x1,
                                                          y1: msg.y1,
                                                          x2: msg.x2,
                                                          y2: msg.y2,
                                                          _color: msg.color,
                                                          _selectedTool: msg.selectedTool,
                                                          _thickness: msg.thickness
                                                      })
                                                  }
                                              }
                                              const player = {
                                                  [sessionId]: {
                                                      sessionId: msg.sessionId,
                                                      sessionNickname: msg.sessionNickname,
                                                      x: msg.x2,
                                                      y: msg.y2,
                                                      color: msg.color,
                                                      selectedTool: msg.selectedTool,
                                                      thickness: msg.thickness
                                                  }
                                              }
                                              dispatch({
                                                  type: SET_PLAYERS, player: player
                                              })
                                          }
                                      }}
                                      ref={(client) => {
                                          clientRef = client
                                      }}/>
                        <div className={st.canvasContainer}>
                            <div ref={draggableRef}
                                 onMouseDown={handleCanvasDragStartHof({
                                     draggableRef, selectedTool,setIsMouseDown, mouseCoords})}
                                 onMouseUp={handleCanvasDragEndHof(
                                     { draggableRef, selectedTool, mouseCoords, setIsMouseDown})}
                                 onMouseMove={handleCanvasDragHof(
                                     { draggableRef, selectedTool, mouseCoords, isMouseDown})}
                                 className={st.outerContainer} style={{
                            }}>
                                <div style={{
                                    width: imageWidth, height: imageHeight,
                                    transform: 'scale(' + zx + ')',
                                }}
                                     className={st.heatmapContainer}>

                                    <canvas style={{
                                        width: '100%', height: '100%', zIndex: 4
                                    }}
                                            width={imageWidth} height={imageHeight}
                                            className={st.itemCanvas} onMouseDown={onMouseDown} onMouseMove={handleDrag}
                                            onMouseUp={handleMouseUp}
                                            ref={canvasRef}/>

                                    {
                                        Object.keys(players).map(k => players[k])
                                            .map( p => {
                                                console.log(p)
                                                return <div className={st.playerIndicator}
                                                            style={{ top: p.y, left: p.x }}>
                                                    <ToolIcon _selectedTool={p.selectedTool} _thickness={p.thickness} _color={p.color}/>

                                                    <span  className={st.playerIndicator_username}> { p.sessionNickname } </span>
                                                </div>
                                            } )
                                    }
                                    <div style={{backgroundImage: bg,
                                        width: '100%', height: '100%', zIndex: 2}}
                                         className={st.itemCanvas}/>
                                </div>
                            </div>

                            <div className={st.heatmapFooter}>
                                <div className={st.toolBar}>
                                    <div className={selectedTool === tools.PENCIL ?
                                        classNames(st.group, st.active) : st.group} onClick={() => setSelectedTool(tools.PENCIL)}>
                                        <div className={selectedTool === tools.PENCIL ?
                                            classNames(st.toolBar_button, st.active) : st.toolBar_button} >
                                            <PencilIcon/>
                                        </div>
                                        <div ref={colorPickerRef} className={st.toolBar_palette_button}
                                             onClick={() => setPaletteActive(true)}>
                                            <PaletteIcon/>
                                            <div className={st.toolBar_button_paletteColor}
                                                 style={{backgroundColor: color}}/>

                                            {paletteActive ?
                                                <Sketch
                                                    style={{marginLeft: 20, position: 'absolute', bottom: 30, left: 0}}
                                                    color={color}
                                                    onChange={(color) => {
                                                        setColor(color.hex);
                                                    }}
                                                /> : null

                                            }

                                        </div>
                                        <div className={st.toolBar_preview}
                                             style={{backgroundColor: color, height: pencilThickness,
                                                 width: pencilThickness }}/>

                                        <Slider
                                            style={{ width: '8rem'}}
                                            progress
                                            defaultValue={pencilThickness}
                                            onChange={value => {
                                                setPencilThickness(value)
                                            }}
                                            max={20}
                                            min={2}
                                            stp={2}
                                        />
                                    </div>
                                    <div className={selectedTool === tools.ERASER ?
                                        classNames(st.group, st.active) : st.group} onClick={() => setSelectedTool(tools.ERASER)}>
                                        <div className={selectedTool === tools.ERASER ?
                                            classNames(st.toolBar_button, st.active) : st.toolBar_button}  onClick={() => setSelectedTool(tools.ERASER)}>
                                            <EraserIcon/>
                                        </div>
                                        <div className={st.toolBar_preview}
                                             style={{backgroundColor:"#fff", height: eraserThickness,
                                                 width: eraserThickness }}/>
                                        <Slider
                                            style={{ width: '8rem'}}
                                            progress
                                            defaultValue={eraserThickness}
                                            onChange={value => {
                                                setEraserThickness(value)
                                            }}
                                            max={20}
                                            min={2}
                                            stp={2}
                                        />
                                    </div>
                                </div>
                                <div className={st.toolBar}>
                                    <div className={selectedTool === tools.DEFAULT ?
                                        classNames(st.group, st.active) : st.group} onClick={() => setSelectedTool(tools.DEFAULT)}>
                                        <div className={st.toolBar_button}
                                             onClick={() => setSelectedTool(tools.DEFAULT)}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 9L2 12M2 12L5 15M2 12H22M9 5L12 2M12 2L15 5M12 2V22M15 19L12 22M12 22L9 19M19 9L22 12M22 12L19 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>


                                        <div className={st.zoomBtn} onClick={() => { if(zx > 0.5) setZx(zx - 0.1)}}>
                                            <svg viewBox={"0 0 24 24"}>
                                                <path fill="currentColor" d={"M19,13H5V11H19V13Z"} />
                                            </svg>
                                        </div>
                                        {/*walkX  {_walkX} walkY {_walkY} startX {mouseCoords.current.startX} currentX {_currentX}*/}
                                        <div className={st.zoomTxt}>
                                            <span> {Math.round(zx * 100)}%</span>
                                        </div>
                                        <div className={st.zoomBtn} onClick={() => { if (zx < 3) setZx(zx + 0.1)}}>
                                            <svg viewBox={"0 0 24 24"}>
                                                <path fill="currentColor" d={"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>


    )
}

export default Canvas
