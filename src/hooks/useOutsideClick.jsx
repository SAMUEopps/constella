import { useEffect, useRef } from "react";

const defaultOptions = { click: true, escape: true };

const useOutsideClick = (callback, options = defaultOptions) => {
    const ref = useRef();

    const handleClick = (e) => {
        if (options.click && ref.current && !ref.current.contains(e.target))
            callback();
    };

    const handleEscape = (e) => {
        if (options.escape && e.key === "Escape")
            callback();
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [ref, options]);

    return ref;
};

export default useOutsideClick;
