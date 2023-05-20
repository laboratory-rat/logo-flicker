import * as paper from 'paper';
import * as p5 from 'p5';
import {useEffect} from "react";

const borderPadding = 16;
export type RenderProps = {
    canvasId: string;
    elementsInRow: number;
    spaceBetween: number;
    imageSource: string;
    imageScale: number;
    noiseScale: number;
}

type ItemWrapper = {
    item: any;
    currentScale: number;
};

const setup = ({ canvasId, noiseScale, imageScale, imageSource, spaceBetween, elementsInRow }: RenderProps) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const matrix: ItemWrapper[][] = [];

    paper.setup(canvas);
    paper.project.importSVG(imageSource, (item: any) => {
        item.scale(imageScale);
        for(let i = 0; i < elementsInRow; i++) {
            const row: any[] = [];
            for(let j = 0; j < elementsInRow; j++) {
                let copy = item.clone();
                copy.position = new paper.Point(i * spaceBetween + borderPadding, j * spaceBetween + borderPadding);
                row.push({
                    item: copy,
                    currentScale: 1,
                });
            }

            matrix.push(row);
        }

        console.log('matrix', matrix);
        item.remove();
    });

    paper.view.onFrame = (event: any) => {
        for (let x = 0; x < matrix.length; x++) {
            const row = matrix[x];
            for (let y = 0; y < row.length; y++) {
                const {item, currentScale} = row[y];
                const noise = p5.prototype.noise(x * noiseScale, y * noiseScale, event.time);
                const newScale =  noise;
                item.scale(newScale);
                row[y].currentScale = newScale;
            }
        }
    };
};

const useRender = (props: RenderProps) => {
    useEffect(() => {
        setup(props);

        return () => paper.project.clear();
    }, [props]);
}

export default useRender;