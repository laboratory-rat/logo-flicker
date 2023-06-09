import {DisplayOptionsFor} from "../../../../../../patterns/core/options";

export type PNoiseOptions = {
    canvasId: string;
    noiseType: string;
    spaceBetween: number;
    imageSource: string;
    imageScale: number;
    noiseScale: number;
    cellSize: number;
    speed: number;
    hideUnder: number;
    changeThreshold: number;
    opacity: number;
}

export type PNoiseDisplayOptions = DisplayOptionsFor<PNoiseOptions>;

export const defaultPNoiseDisplayOptions = (canvasId: string): PNoiseDisplayOptions => ({
    canvasId: {
        type: 'string',
        ignore: true,
        options: [canvasId],
        value: canvasId,
        label: 'Canvas ID',
    },

    noiseType: {
        type: 'string',
        ignore: false,
        value: 'perlin',
        options: ['perlin', 'simplex'],
        label: 'Noise type',
    },

    noiseScale: {
        type: 'number',
        ignore: false,
        value: 0.005,
        min: 0.0001,
        max: 1,
        step: 0.0001,
        label: 'Noise scale',
    },

    imageScale: {
        type: 'number',
        ignore: false,
        value: 0.07,
        min: 0.01,
        max: 10,
        step: 0.01,
        label: 'Image scale',
    },

    imageSource: {
        type: 'string',
        ignore: false,
        value: '/logo-flicker/img/logos/blue.svg',
        label: 'Image source',
        options: [
            '/logo-flicker/img/logos/blue.svg',
            '/logo-flicker/img/logos/blue-small.svg',
            '/logo-flicker/img/logos/white.svg',
            '/logo-flicker/img/logos/black.svg',
        ],
    },

    spaceBetween: {
        type: 'number',
        ignore: false,
        value: 30,
        min: 1,
        max: 100,
        step: 1,
        label: 'Space between',
    },

    speed: {
        type: 'number',
        ignore: false,
        value: 0.05,
        min: 0.01,
        max: 1,
        step: 0.01,
        label: 'Speed',
    },

    hideUnder: {
        type: 'number',
        ignore: false,
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Hide under',
    },

    cellSize: {
        type: 'number',
        ignore: false,
        value: 2,
        min: 1,
        max: 100,
        step: 1,
        label: 'Cell size',
    },

    changeThreshold: {
        type: 'number',
        ignore: false,
        value: 0.005,
        min: 0,
        max: 1,
        step: 0.0001,
        label: 'Change threshold',
    },

    opacity: {
        type: 'number',
        ignore: false,
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Opacity',
    },
});

export const displayOptionsToOptions = (displayOptions: PNoiseDisplayOptions): PNoiseOptions => ({
    canvasId: displayOptions.canvasId.value,
    noiseType: displayOptions.noiseType.value,
    noiseScale: displayOptions.noiseScale.value,
    imageScale: displayOptions.imageScale.value,
    imageSource: displayOptions.imageSource.value,
    spaceBetween: displayOptions.spaceBetween.value,
    speed: displayOptions.speed.value,
    hideUnder: displayOptions.hideUnder.value,
    cellSize: displayOptions.cellSize.value,
    changeThreshold: displayOptions.changeThreshold.value,
    opacity: displayOptions.opacity.value,
});
