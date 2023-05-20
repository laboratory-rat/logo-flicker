import * as paper from 'paper';
import * as p5 from 'p5';
import React, {useEffect, useState} from "react";

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

const useRender = ({canvasId, elementsInRow, noiseScale}: RenderProps) => {
    const [itemsMatrix, setItemsMatrix] = useState<ItemWrapper[][]>(() => {
        const matrix = [] as ItemWrapper[][];
        for (let i = 0; i < elementsInRow; i++) {
            const row: ItemWrapper[] = [];
            for (let j = 0; j < elementsInRow; j++) {
                row.push({item: null, currentScale: 1});
            }
            matrix.push(row);
        }
        return matrix;
    });

    useEffect(() => {
        let counter = 0;
        const interval = setInterval(() => {
            const newMatrix = [] as ItemWrapper[][];
            for (let x = 0; x < elementsInRow; x++) {
                const row = itemsMatrix[x];
                const newRow: ItemWrapper[] = [];
                for (let y = 0; y < elementsInRow; y++) {
                    const {currentScale} = row[y];
                    const noise = p5.prototype.noise(x * noiseScale, y * noiseScale, counter);
                    const newScale = 1 / currentScale * noise;
                    newRow.push({item: row[y].item, currentScale: parseFloat(newScale.toFixed(2))});
                }

                newMatrix.push(newRow);
            }

            setItemsMatrix(() => newMatrix);
            counter++;
        }, 1000);

        return () => clearInterval(interval);
    }, [elementsInRow, noiseScale])

    return {matrix: itemsMatrix};
}

export default useRender;