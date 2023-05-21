import {FC, useMemo, useState} from "react";
import { SketchPicker } from 'react-color';
import './color-picker.component.scss';

type ColorPickerComponentProps = {
    color: string;
    handleSetColor: (color: string) => unknown;
}

const ColorPickerComponent: FC<ColorPickerComponentProps> = ({color: defaultColor, handleSetColor}) => {
    const color = useMemo(() => defaultColor, [defaultColor]);
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div className={'color-picker__button'}>
            <div className={'color-picker__button-color'} onClick={() => setShowPicker(!showPicker)} style={{backgroundColor: color}}/>
            {
                showPicker && (
                    <div className={'color-picker__modal'}>
                        <div className={'color-picker__modal-overlay'} onClick={() => setShowPicker(false)} />
                        <SketchPicker
                            color={ color }
                            onChangeComplete={ (result) =>  handleSetColor(result.hex) }
                        />
                    </div>
                )
            }
        </div>
    );
};

export default ColorPickerComponent;