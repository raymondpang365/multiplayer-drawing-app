import React, {FC} from "react";
import st from "@components/DrawingPage/canvas/canvas.module.scss";
import {CursorIcon} from "@components/DrawingPage/canvas/icons";
import {ToolIconProps, TOOLS} from "@components/DrawingPage/canvas/type";



const ToolIcon: FC<ToolIconProps> = ({_selectedTool, _thickness, _color }) => {
    switch (_selectedTool) {
        case TOOLS.ERASER:
            return       <div className={st.eraser_cursor}
                              style={{backgroundColor:"#fff", height: _thickness,
                                  width: _thickness }}/>
        case TOOLS.PENCIL:
            return <div className={st.eraser_cursor}
                        style={{backgroundColor: _color, height: _thickness,
                            width: _thickness }}/>
        default:
            return <CursorIcon/>

    }
}

export default ToolIcon