import './radial.view.scss';
import {useMemo, useState} from "react";
import usePNoiseRender from "../perlin/engine/perlin.engine";
import ColorPickerComponent from "../../../../../components/color-picker/color-picker.component";
import SettingsComponent from "../../../../../components/settings/settings.component";
import {
    defaultRadialDisplaySettings,
    displaySettingsToSettings,
    RadialDisplaySettings,
    RadialSettings
} from "./settings/radial.settings";
import useRadialRender from "./engine/radial.engine";
import {DisplayOptionsFor} from "../../../../../patterns/core/options";

const canvasId = 'canvas';
const defaultOptions = defaultRadialDisplaySettings(canvasId);

const RadialView = () => {
    const [displayOptions, setDisplayOptions] = useState(defaultOptions);
    const options = useMemo(() => displaySettingsToSettings(displayOptions), [displayOptions]);
    const [bgColor, setBgColor] = useState('#e5e5e5');

    useRadialRender(options);

    return (
        <div className="container">
            <div className={'content'}>
                <div className={'content__title'}>
                    <div>Radial Logo Flicker</div>
                    <ColorPickerComponent color={bgColor} handleSetColor={setBgColor} />
                </div>
                <div className={'content__playground'}>
                    <div className={'content__playground-canvas'} style={{backgroundColor: bgColor}} id={canvasId}></div>
                    <div className={'content__playground-settings'}>
                        <SettingsComponent options={displayOptions} setOptions={(x) => setDisplayOptions(x as RadialDisplaySettings)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadialView;