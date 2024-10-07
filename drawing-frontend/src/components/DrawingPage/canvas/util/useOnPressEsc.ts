import {useCallback, useEffect} from "react";


const useOnPressEsc = (onPressEsc) => {
    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            //Do whatever when esc is pressed
            onPressEsc()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
}

export default useOnPressEsc