import React, {useRef, useEffect, useState, FC, MouseEventHandler} from 'react'
import {useDispatch, useSelector} from "react-redux";
import st from "./canvas.module.scss"
import SockJsClient from "react-stomp";
import templateSt from "@components/DrawingPage/DrawingPage.module.scss"
import useGridLine from "./grid/useGridLine";
import dynamic from "next/dynamic";
import {Slider} from "rsuite";
import 'rsuite/Slider/styles/index.css';
import classNames from "classnames";
import useOnPressEsc from "./util/useOnPressEsc";
import useOutsideDetector from "@components/DrawingPage/canvas/util/useOutsideDetector";
import {RootState} from "@redux/store";
import { ActionTypes } from "@redux/type";
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
import ToolIcon from "@components/DrawingPage/canvas/ToolIcon";
const { v4: uuidv4 } = require('uuid');
import {
    MouseCoords,
    DrawingAction,
    HandleCanvasDraggingHofInput,
    HandleCanvasDragHofInput, TOOLS
} from "@components/DrawingPage/canvas/type";
import {ColorResult} from "@uiw/react-color";

const Sketch = dynamic(() => import('@uiw/react-color').then(mod => mod.Sketch), {
    ssr: false
});



const Canvas: React.FC = () => {

    const imageHeight = 1080
    const imageWidth = 1920
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const dispatch = useDispatch()

    const [zx, setZx] = useState<number>(1)
    const [color, setColor] = useState<string>("#000000");

    const setHex = (newShade: ColorResult) => {
        setColor(newShade.hex);
    }

    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

    const sessionId = useSelector((state: RootState) => state.canvasState.sessionId)
    const sessionNickname = useSelector((state: RootState) => state.canvasState.sessionNickname)

    let clientRef = useRef<any>(null);

    const [ connected, setConnected] = useState<boolean>(false)

    useEffect(() => {
        if(connected){
            const uuid = uuidv4()
            dispatch({
                type: ActionTypes.SET_SESSION_ID,
                sessionId: uuid
            })
            if(clientRef != null) {
                // @ts-ignore
                clientRef.sendMessage(
                    "/ws.new_session",
                    uuid
                )
            }
        }
    }, [connected])


    const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if(sessionId == null) return

        setIsMouseDown(true)
        const target = event.target as HTMLElement
        const bounds = target.getBoundingClientRect();
        console.log([event.clientX, event.clientY, bounds.left, bounds.top])
        const x = (event.clientX - bounds.left) / zx;
        const y = (event.clientY - bounds.top) / zx;
        setLastPosition({x, y})
    }

    const canvas = canvasRef.current;

    const [pencilThickness, setPencilThickness] = useState<number>(6)
    const [eraserThickness, setEraserThickness] = useState<number>(6)

    const [lastPosition, setLastPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const [selectedTool, setSelectedTool] = useState<TOOLS>(TOOLS.DEFAULT)

    const draggableRef = useRef<HTMLDivElement | null>(null)
    const isInitialized = useRef<boolean>(false);
    const mouseCoords = useRef<MouseCoords>({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
    }) as React.MutableRefObject<MouseCoords>;

    useOnPressEsc(() => {
        setSelectedTool(TOOLS.DEFAULT)
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

    const handleDrag: MouseEventHandler<HTMLCanvasElement> | undefined = (event) => {
        if(sessionId == null) return
        const target = event.target as HTMLElement;
        const bounds = target.getBoundingClientRect();
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
                thickness: selectedTool === TOOLS.PENCIL ? pencilThickness : eraserThickness,
                time: Date.now()
            }
            if (clientRef != null) {
                // @ts-ignore
                clientRef.sendMessage(
                    "/ws.draw",
                    JSON.stringify(action)
                )
            }
        if(isMouseDown && selectedTool !== TOOLS.DEFAULT) {
            setLastPosition({x: offsetX, y: offsetY});
        }
    }

    const colorPickerRef = useRef<HTMLDivElement | null>(null)

    useOutsideDetector(colorPickerRef, () => {
        if(colorPickerRef != null) {
            setPaletteActive(false)
        }
    })

    const bg = useGridLine()
    const [ paletteActive, setPaletteActive ] = useState(false)
    const players = useSelector((state: RootState) => state.canvasState.players)
    const userQueue = sessionId != null ? [ `/user/${sessionId}/welcome`] : []

    return (
        <div className={templateSt.verticalSplit}>
            <TopNav/>
            <div className={templateSt.reportContainer}>
                <div className={templateSt.page}>
                    <div className={templateSt.reportContentWrapper}>
                        <SockJsClient url={`${config.apiUrl}/ws`}
                                      onDisconnect={() => {
                                      }}
                                      onConnect={(msg) => {
                                          console.log(msg)
                                          setConnected(true)
                                        }
                                        }
                                      topics={[`/topic/draw`, `/topic/disconnect`,  ...userQueue]}

                                      onMessage={(msg, topic) => {
                                          if(topic ===  `/user/${sessionId}/welcome`){
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
                                          else if(topic === `/topic/disconnect`){
                                              dispatch({
                                                  type: ActionTypes.REMOVE_ONLINE_PLAYER,
                                                  sessionId: msg.sessionId
                                              })
                                          }
                                          else if(topic === `/topic/draw`) {
                                              // window.alert(JSON.stringify(msg))
                                              if (canvas != null) {
                                                  const ctx = canvas.getContext('2d');
                                                  if (msg.isMouseDown && msg.selectedTool !== TOOLS.DEFAULT) {
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
                                                  [msg.sessionId]: {
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
                                                  type: ActionTypes.SET_PLAYERS,
                                                  player: player
                                              })
                                          }
                                      }}
                                      ref={(client) => {
                                          clientRef = client
                                      }}/>
                        <div className={st.canvasContainer}>
                            <div ref={draggableRef}
                                 onMouseDown={handleCanvasDragStartHof({
                                     draggableRef, selectedTool, setIsMouseDown, mouseCoords
                                 } as HandleCanvasDragHofInput)}
                                 onMouseUp={handleCanvasDragEndHof(
                                     {
                                         draggableRef, selectedTool, mouseCoords, setIsMouseDown
                                     } as HandleCanvasDragHofInput)}
                                 onMouseMove={handleCanvasDragHof(
                                     {
                                         draggableRef, selectedTool, mouseCoords, isMouseDown
                                     } as HandleCanvasDraggingHofInput)}
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
                                                    <ToolIcon
                                                        _selectedTool={p.selectedTool}
                                                        _thickness={p.thickness}
                                                        _color={p.color}/>

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
                                    <div className={selectedTool === TOOLS.PENCIL ?
                                        classNames(st.group, st.active) : st.group} onClick={() => setSelectedTool(TOOLS.PENCIL)}>
                                        <div className={selectedTool === TOOLS.PENCIL ?
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
                                                    className={st.sketch_component}
                                                    color={color as any}
                                                    onChange={setHex as any}
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
                                    <div className={selectedTool === TOOLS.ERASER ?
                                        classNames(st.group, st.active) : st.group} onClick={() => setSelectedTool(TOOLS.ERASER)}>
                                        <div className={selectedTool === TOOLS.ERASER ?
                                            classNames(st.toolBar_button, st.active) : st.toolBar_button}  onClick={() => setSelectedTool(TOOLS.ERASER)}>
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
                                    <div className={selectedTool === TOOLS.DEFAULT ?
                                        classNames(st.group, st.active) : st.group} onClick={() => setSelectedTool(TOOLS.DEFAULT)}>
                                        <div className={st.toolBar_button}
                                             onClick={() => setSelectedTool(TOOLS.DEFAULT)}>
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
