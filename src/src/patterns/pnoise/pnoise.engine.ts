import * as p5 from 'p5';
import {useEffect} from "react";
import Two from 'two.js'
import {PNoiseOptions} from "./pnoise.options";

let iteration = 0;
type CleanupCallback = () => unknown;

const setup = ({
                   canvasId,
                   noiseScale,
                   imageScale,
                   imageSource,
                   spaceBetween,
                   cellSize,
                   speed,
                   hideUnder
               }: PNoiseOptions,
               selfIteration: number,
): CleanupCallback => {
    const two = new Two({
        type: Two.Types.svg,
        fullscreen: false,
        autostart: true,
        fitted: true,
    }).appendTo(document.getElementById(canvasId) as HTMLElement);

    const padding = 16;
    const gridSize = cellSize;  // Define your grid size based on the size of SVG
    const cols = Math.floor(two.width / (gridSize + spaceBetween - padding));
    const rows = Math.floor(two.height / (gridSize + spaceBetween - padding));
    const allItems: any[] = [];
    let currentFrame = 0;

    two.load(imageSource, (svgGroup: any) => {
        if (selfIteration !== iteration) {
            return;
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let clonedSvg = svgGroup.clone();
                let xOffset = (j % 2 === 0) ? 0 : (gridSize / 2 + spaceBetween / 2);
                clonedSvg.center().translation.set(i * (gridSize + spaceBetween) + padding + xOffset,
                    j * (Math.sqrt(3) / 2 * gridSize + spaceBetween) + padding);
                two.add(clonedSvg);
                allItems.push(clonedSvg);
            }
        }
    });

    iteration === selfIteration && two.update();

    const animate = () => {
        if (iteration !== selfIteration) {
            return;
        }

        update();
        two.update();
        currentFrame++;
        requestAnimationFrame(animate)
    }

    const update = () => {
        for (const item of allItems) {
            if (iteration !== selfIteration) {
                return;
            }

            const noise = p5.prototype.noise(item.position.x * noiseScale, item.position.y * noiseScale, currentFrame * speed);
            const roundedNoise = Math.round(noise * 100) / 100;
            const newScale = roundedNoise * imageScale;

            if (roundedNoise <= hideUnder) {
                item.opacity = 0;
                continue;
            }

            if (Math.abs(item.scale - newScale) < 0.005) {
                continue;
            }

            item.scale = newScale;
            item.opacity = roundedNoise;
        }
    };

    requestAnimationFrame(animate);

    return () => {
        for (const item of allItems) {
            two.remove(item);
        }

        two.clear();
        const twoChild = two.renderer.domElement;
        twoChild.parentNode && twoChild.parentNode.removeChild(twoChild);
    }
};

const usePNoiseRender = (props: PNoiseOptions) => {
    useEffect(() => {
        iteration++;
        const cleanup = setup(props, iteration);

        return () => {
            cleanup();
        };
    }, [props]);
}

export default usePNoiseRender;