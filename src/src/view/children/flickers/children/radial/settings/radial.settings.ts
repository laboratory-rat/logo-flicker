import {DisplayOptionsFor} from "../../../../../../patterns/core/options";

export type RadialSettings = {
    canvasId: string;
    spaceBetween: number;
    imageSource: string;
    imageScale: number;
    cellSize: number;
    hideUnder: number;
    opacity: number;
    speed: number;
    distanceBetweenWaves: number;
    waveDense: number;
};

export type RadialDisplaySettings = DisplayOptionsFor<RadialSettings>;

export const defaultRadialDisplaySettings = (canvasId: string): RadialDisplaySettings => ({
    canvasId: {
        type: 'string',
        ignore: true,
        options: [canvasId],
        value: canvasId,
        label: 'Canvas ID',
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

    cellSize: {
        type: 'number',
        ignore: false,
        value: 2,
        min: 1,
        max: 100,
        step: 1,
        label: 'Cell size',
    },

    speed: {
        type: 'number',
        ignore: false,
        value: 0.3,
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

    opacity: {
        type: 'number',
        ignore: false,
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Opacity',
    },

    distanceBetweenWaves: {
        type: 'number',
        ignore: false,
        value: 50,
        min: 1,
        max: 1000,
        step: 1,
        label: 'Distance between waves',
    },

    waveDense: {
        type: 'number',
        ignore: false,
        value: 1,
        min: 0.01,
        max: 200,
        step: 0.01,
        label: 'Wave dense',
    }
});

export const displaySettingsToSettings = (displaySettings: RadialDisplaySettings): RadialSettings => ({
    canvasId: displaySettings.canvasId.value,
    spaceBetween: displaySettings.spaceBetween.value,
    imageSource: displaySettings.imageSource.value,
    imageScale: displaySettings.imageScale.value,
    cellSize: displaySettings.cellSize.value,
    hideUnder: displaySettings.hideUnder.value,
    speed: displaySettings.speed.value,
    opacity: displaySettings.opacity.value,
    distanceBetweenWaves: displaySettings.distanceBetweenWaves.value,
    waveDense: displaySettings.waveDense.value,
});
