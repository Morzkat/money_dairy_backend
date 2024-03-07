export function parseStringToFloat(value: string) {
    const num = parseFloat(value.split(',').join(''));

    if (num === Number.NaN)
        throw new Error('Error formating number.');

    return num;
}