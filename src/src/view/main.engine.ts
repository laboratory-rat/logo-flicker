import * as p5 from 'p5';
import {useEffect} from "react";
import Two from 'two.js'

const borderPadding = 16;
export type RenderProps = {
    canvasId: string;
    spaceBetween: number;
    imageSource: string;
    imageScale: number;
    noiseScale: number;
    cellSize: number;
    speed: number;
    hideUnder: number;
}

type ItemWrapper = {
    item: any;
    currentScale: number;
};

const setup = ({ canvasId, noiseScale, imageScale, imageSource, spaceBetween, cellSize, speed, hideUnder }: RenderProps) => {
    const two = new Two({
        fullscreen: true,
        autostart: true,
    }).appendTo(document.body);

    const padding = 16;
    const gridSize = cellSize;  // Define your grid size based on the size of SVG
    const cols = Math.floor(two.width / (gridSize + spaceBetween - padding));
    const rows = Math.floor(two.height / (gridSize + spaceBetween - padding));
    const allItems: any[] = [];
    let currentFrame = 0;

    two.load(imageSource, (svgGroup: any) => {
        for(let i=0; i<cols; i++) {
            for(let j=0; j<rows; j++) {
                // let clonedSvg = svgGroup.clone();
                // clonedSvg.center().translation.set(i * (gridSize + spaceBetween) + padding, j * (gridSize + spaceBetween) + padding);
                // two.add(clonedSvg);
                // allItems.push(clonedSvg);

                let clonedSvg = svgGroup.clone();

                // Calculate the offset for every second row
                let xOffset = (j % 2 === 0) ? 0 : (gridSize / 2 + spaceBetween / 2);

                // Position each hexagon
                clonedSvg.center().translation.set(i * (gridSize + spaceBetween) + padding + xOffset,
                    j * (Math.sqrt(3)/2 * gridSize + spaceBetween) + padding);
                two.add(clonedSvg);
                allItems.push(clonedSvg);
            }
        }
    });
    two.update();

    const animate = () => {
        update();
        two.update();
        currentFrame++;
        requestAnimationFrame(animate)
    }

    const update = () => {
        for (const item of allItems) {
            const noise = p5.prototype.noise(item.position.x * noiseScale, item.position.y * noiseScale, currentFrame * speed);
            const roundedNoise = Math.round(noise * 100) / 100;
            const newScale =  roundedNoise * imageScale;

            if (roundedNoise <= hideUnder) {
                item.opacity = 0;
                continue;
            }

            if (Math.abs(item.scale - newScale) < 0.005) {
                continue;
            }

            item.scale = newScale;
            // item.opacity = 1 + (1 / Math.log10(roundedNoise));
            item.opacity = roundedNoise;
        }
    };

    requestAnimationFrame(animate);
    return two;
};

const useRender = (props: RenderProps) => {
    useEffect(() => {
        const two = setup(props);

        return () => {
            two.clear();
        };
    }, [props]);
}

export default useRender;