import {FC, FormEvent, useEffect, useState} from "react";
import './settings.component.scss';
import {PNoiseDisplayOptions} from "../../../patterns/pnoise/pnoise.options";
import {OptionsForNumber, OptionsForString} from "../../../patterns/core/options";

type SettingsProps = {
    options: PNoiseDisplayOptions;
    setOptions: (item: PNoiseDisplayOptions) => unknown;
}

const SettingsComponent: FC<SettingsProps> = ({options, setOptions: _setOptions}) => {
    const [innerOptions, setInnerOptions] = useState(options);

    useEffect(() => {
        setInnerOptions(JSON.parse(JSON.stringify(options)) as PNoiseDisplayOptions);
    }, [options]);

    const setOptions = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        _setOptions(innerOptions);
    }

    const updateOption = (key: keyof PNoiseDisplayOptions, value: number | string) => {
        const currentProp = innerOptions[key];
        if (currentProp.type === 'number') {
            const parsedVal = parseFloat(value as string);
            if (isNaN(parsedVal)) {
                return;
            }

            setInnerOptions({
                ...innerOptions,
                [key]: {
                    ...currentProp,
                    value: parsedVal
                }
            });
        } else if (currentProp.type === 'string') {
            const parsedVal = value as string;
            if (parsedVal === '') {
                return;
            }

            setInnerOptions({
                ...innerOptions,
                [key]: {
                    ...currentProp,
                    value: parsedVal
                }
            });
        }
    }

    const renderProp = (key: keyof PNoiseDisplayOptions, prop: OptionsForNumber | OptionsForString) => {
        if (prop.ignore) {
            return null;
        }

        switch (prop.type) {
            case 'number':
                return (
                    <div className={'content__playground-settings-item'}>
                        <div className={'content__playground-settings-item-title'}>
                            {prop.label}
                        </div>
                        <div className={'content__playground-settings-item-input'}>
                            <input type={'number'} min={prop.min} max={prop.max} step={prop.step} value={prop.value}
                                   onChange={(e) => updateOption(key, e.target.value)}/>
                        </div>
                    </div>
                );
            case 'string':
                return (
                    <div className={'content__playground-settings-item'}>
                        <div className={'content__playground-settings-item-title'}>
                            {prop.label}
                        </div>
                        <div className={'content__playground-settings-item-input'}>
                            <select value={prop.value} onChange={(e) => updateOption(key, e.target.value)}>
                                {prop.options.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <form onSubmit={(e) => setOptions(e)} >
            <ul>
                {Object.entries(innerOptions).filter(([_, prop]) => !prop.ignore).map(([key, prop]) => (
                    <li key={key}>
                        {renderProp(key as keyof PNoiseDisplayOptions, prop)}
                    </li>
                ))}

                <li>
                    <button style={{width: '100%', display: 'block'}} type={'submit'}>Apply</button>
                </li>
            </ul>
        </form>
    );
};

export default SettingsComponent;