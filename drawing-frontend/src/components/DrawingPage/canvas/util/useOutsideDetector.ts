import React, { useRef, useEffect } from "react";

type RefType = React.RefObject<HTMLElement>;
type FuncType = () => void;

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideDetector(ref: RefType, func: FuncType) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      console.log(event.target)
      console.log(ref.current)
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log('clicked outside')
        func()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}