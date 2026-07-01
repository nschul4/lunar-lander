export function scaleFromRangeToRange(
    inputRangeLow: number,
    inputRangeHigh: number,
    outputRangeLow: number,
    outputRangeHigh: number,
    input: number,
) {
    return ((input - inputRangeLow) / (inputRangeHigh - inputRangeLow))
        * (outputRangeHigh - outputRangeLow) + outputRangeLow;
}
