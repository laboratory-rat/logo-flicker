import './main.view.scss';

import {useMemo, useState} from "react";
import {defaultPNoiseDisplayOptions, displayOptionsToOptions, PNoiseDisplayOptions} from "./settings/pnoise.settings";
import usePNoiseRender from "./engine/perlin.engine";
import ColorPickerComponent from "../../../../../components/color-picker/color-picker.component";
import SettingsComponent from "../../../../../components/settings/settings.component";

const canvasId = 'canvas';
const defaultOptions = defaultPNoiseDisplayOptions(canvasId);

const PerlinView = () => {
    const [displayOptions, setDisplayOptions] = useState(defaultOptions);
    const options = useMemo(() => displayOptionsToOptions(displayOptions), [displayOptions]);
    const [bgColor, setBgColor] = useState('#e5e5e5');

    usePNoiseRender(options);

    return (
        <div className="container">
            <div className={'content'}>
                <div className={'content__title'}>
                    <div>Perlin Logo Flicker</div>
                    <ColorPickerComponent color={bgColor} handleSetColor={setBgColor} />
                </div>
                <div className={'content__playground'}>
                    <div className={'content__playground-canvas'} style={{backgroundColor: bgColor}} id={canvasId}></div>
                    <div className={'content__playground-settings'}>
                        <SettingsComponent options={displayOptions} setOptions={x => setDisplayOptions(x as PNoiseDisplayOptions)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerlinView;
