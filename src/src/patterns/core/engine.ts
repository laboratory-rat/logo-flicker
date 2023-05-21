import {PNoiseOptions} from "../pnoise/pnoise.options";
import Two from "two.js";
import * as p5 from "p5";
import {createNoise3D, NoiseFunction3D} from 'simplex-noise';

type CleanupCallback = () => unknown;
type SetupProps = {
    settings: PNoiseOptions;
}

type NoiseFnInstance = {
    init: (seed: number) => void;
    next: (x: number, y: number, z: number) => number;
    clear: () => void;
}

const perlinInit = (): NoiseFnInstance => {
    return {
        init: (seed: number) => {
            p5.prototype.noiseSeed(seed);
        },
        next: (x: number, y: number, z: number) => p5.prototype.noise(x, y, z),
        clear: () => {
            p5.prototype.noiseSeed(Math.random() * 100000);
        }
    }
}

const simplexInit = (): NoiseFnInstance => {
    let instance: NoiseFunction3D | null = null;

    return {
        init: (_) => {
            instance = createNoise3D(Math.random);
        },
        next: (x: number, y: number, z: number) => instance!(x, y, z),
        clear: () => {
            instance = null;
        }
    }
}

const noiseFnMap = new Map<string, () => NoiseFnInstance>([
    ['perlin', perlinInit],
    ['simplex', simplexInit],
]);

export const startEngine = ({settings}: SetupProps): CleanupCallback => {
    const {
        canvasId,
        noiseScale,
        imageScale,
        imageSource,
        spaceBetween,
        cellSize,
        speed,
        hideUnder,
        opacity,
        noiseType,
        changeThreshold,
    } = settings;
    let stopRequested = false;

    const noiseIniter = noiseFnMap.get(noiseType)!();
    noiseIniter.init(Math.random() * 100000);

    const instance = new Two({
        type: Two.Types.svg,
        fullscreen: false,
        autostart: true,
        fitted: true,
    }).appendTo(document.getElementById(canvasId) as HTMLElement);

    const padding = 16;
    const gridSize = cellSize;  // Define your grid size based on the size of SVG
    const cols = Math.floor(instance.width / (gridSize + spaceBetween - padding));
    const rows = Math.floor(instance.height / (gridSize + spaceBetween - padding));
    const allItems: any[] = [];

    instance.load(imageSource, (svgGroup: any) => {
        if (stopRequested) {
            return;
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let clonedSvg = svgGroup.clone();
                let xOffset = (j % 2 === 0) ? 0 : (gridSize / 2 + spaceBetween / 2);
                clonedSvg.center().translation.set(i * (gridSize + spaceBetween) + padding + xOffset,
                    j * (Math.sqrt(3) / 2 * gridSize + spaceBetween) + padding);
                clonedSvg.opacity = opacity;
                instance.add(clonedSvg);
                allItems.push(clonedSvg);
            }
        }
    });

    instance.bind('update', (currentFrame: number) => {
        if (stopRequested) {
            return;
        }

        for (const item of allItems) {
            const noise = noiseIniter.next(item.position.x * noiseScale, item.position.y * noiseScale, currentFrame * speed);
            const roundedNoise = noise;
            const newScale = roundedNoise * imageScale;

            if (hideUnder !== 0 && roundedNoise <= hideUnder) {
                item.visible = false;
                continue;
            }

            if (Math.abs(item.scale - newScale) < changeThreshold) {
                continue;
            }

            if (!item.visible) {
                item.visible = true;
            }


            item.scale = newScale;
        }
    });

    return () => {
        stopRequested = true;
        for (const item of allItems) {
            instance.remove(item);
        }

        instance.clear();
        instance.unbind('update');
        const twoChild = instance.renderer.domElement;
        twoChild.parentNode && twoChild.parentNode.removeChild(twoChild);
        noiseIniter.clear();
    }
}