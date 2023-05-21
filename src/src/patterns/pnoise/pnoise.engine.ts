import {useEffect} from "react";
import {PNoiseOptions} from "./pnoise.options";
import {startEngine} from "../core/engine";

const usePNoiseRender = (props: PNoiseOptions) => {
    useEffect(() => {
        const cleanup = startEngine({settings: props});

        return () => {
            cleanup();
        };
    }, [props]);
}

export default usePNoiseRender;