import {useEffect} from "react";

const useScrollByWheelHandler = ({ zx, setZx, draggableRef }) => {
    const handleZoom = function (e) {
        var dir;
        if (!e.ctrlKey) {
            return;
        } else {
            e.preventDefault();
            e.stopPropagation();
            if (e.deltaY > 0 && zx < 3) {
                dir = 0.1
            } else if (e.deltaY <= 0 && zx >= 0.35) {
                dir = -0.1
            } else {
                return
            }
            let newzx = zx + dir
            setZx(newzx)
            return;
        }
    }

    useEffect(() => {
        const ele = draggableRef != null ? draggableRef.current : window
        ele.addEventListener('wheel', handleZoom, {
            passive: false // Add this
        });
        return () => {
            ele.removeEventListener('wheel', handleZoom);
        };
    }, [zx])
}

export default useScrollByWheelHandler