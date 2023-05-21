import {useEffect} from "react";
import Two from "two.js";
import {RadialSettings} from "../settings/radial.settings";


const useRadialRender = (props: RadialSettings) => {
    useEffect(() => {
        const {
            canvasId,
            imageScale,
            imageSource,
            spaceBetween,
            speed,
            opacity,
            cellSize,
            hideUnder,
            distanceBetweenWaves,
            waveDense,
        } = props;
        let stopRequested = false;

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
        const centerX = instance.width / 2;
        const centerY = instance.height / 2;

        const next = (x: number, y: number, time: number): number => {
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const wave = Math.sin(distance / distanceBetweenWaves - time);
            return Math.abs(Math.sin(wave * waveDense));
        }

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
                const noise = next(item.position.x, item.position.y, currentFrame * speed);
                const newScale = noise * imageScale;

                if (hideUnder !== 0 && noise <= hideUnder) {
                    item.visible = false;
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
        }
    }, [props]);
}

export default useRadialRender;