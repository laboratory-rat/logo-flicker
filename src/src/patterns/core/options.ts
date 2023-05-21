export type OptionsForNumber = {
    type: 'number';
    ignore: boolean;
    value: number;
    label: string;
    min: number;
    max: number;
    step: number;
}

export type OptionsForString = {
    type: 'string';
    ignore: boolean;
    value: string;
    label: string;
    options: string[];
}

export type DisplayOptionsFor<TOptions> = {
    [key in keyof TOptions]: TOptions[key] extends number
        ? OptionsForNumber
        : TOptions[key] extends string
            ? OptionsForString
            : never;
}
