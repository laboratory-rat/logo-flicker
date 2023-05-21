import './main.view.scss';
import SettingsComponent from "./components/settings/settings.component";
import {
    defaultPNoiseDisplayOptions,
    displayOptionsToOptions,
} from "../patterns/pnoise/pnoise.options";
import {useMemo, useState} from "react";
import usePNoiseRender from "../patterns/pnoise/pnoise.engine";
import ColorPickerComponent from "./components/color-picker/color-picker.component";

const canvasId = 'canvas';
const defaultOptions = defaultPNoiseDisplayOptions(canvasId);

const MainView = () => {
    const [displayOptions, setDisplayOptions] = useState(defaultOptions);
    const options = useMemo(() => displayOptionsToOptions(displayOptions), [displayOptions]);
    const [bgColor, setBgColor] = useState('#e5e5e5');

    usePNoiseRender(options);

    return (
        <div className="container">
            <div className={'content'}>
                <div className={'content__title'}>
                    <div>Logo flicker</div>
                    <ColorPickerComponent color={bgColor} handleSetColor={setBgColor} />
                </div>
                <div className={'content__playground'}>
                    <div className={'content__playground-canvas'} style={{backgroundColor: bgColor}} id={canvasId}></div>
                    <div className={'content__playground-settings'}>
                        <SettingsComponent options={displayOptions} setOptions={setDisplayOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainView;
