import {useCallback, useEffect} from "react";


const useOnPressEsc = (onPressEsc: () => void): void => {
    const escFunction = useCallback((event: KeyboardEvent) => {
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