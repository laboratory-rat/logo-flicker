import {FC, useCallback, useEffect, useState} from "react";
import recorder from 'react-canvas-recorder';
import './record.component.scss';

type RecordComponentProps = {
}

type State = {
    status: 'idle' | 'recording' | 'paused';
}

const RecordComponent: FC<RecordComponentProps> = () => {
    const [state, setState] = useState<State>({status: 'idle'});

    const startRecording = useCallback(() => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        recorder.createStream(canvas);
        recorder.start();
    }, [])

    const stopRecording = useCallback(() => {
        recorder.stop();
        const file = recorder.save();
        const url = window.URL.createObjectURL(
            new Blob([file]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `video.webm`,
        );

        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    }, [])

    useEffect(() => {
        switch (state.status) {
            case 'idle':
                break;
            case 'recording':
                startRecording();
                break;
            case 'paused':
                stopRecording();
                break;
            default:
                console.error('Unknown state', state);
                break;
        }
    }, [startRecording, stopRecording, state])

    return (
        <div className={'record-content'}>
            <div>Record: </div>
            <button
                type={'button'}
                onClick={() => setState({status: state.status === 'recording' ? 'paused' : 'recording'})}
            >{
                state.status === 'recording' ? 'Stop' : 'Start'
            }</button>
        </div>
    );
};

export default RecordComponent;