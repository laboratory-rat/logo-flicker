import useRender from "./main.engine";
import './main.view.scss';

const canvasId = 'canvas';

const props = {
    canvasId: canvasId,
    noiseScale: 0.005,
    imageScale: 0.07,
    imageSource: '/img/logos/blue.svg',
    spaceBetween: 30,
    cellSize: 2,
    speed: 0.05,
    hideUnder: 0.2,
}

const MainView = () => {
    useRender(props);

    return (
        <div className={'content'}>
            <canvas id={canvasId}></canvas>
        </div>
    );
};

export default MainView;
