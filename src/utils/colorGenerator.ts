type colorRangeInfoType = {
    colorStart: number, // from 0 to 1
    colorEnd: number, // from 0 to 1
    useEndAsStart: boolean,
}

function calculatePoint(i: number, intervalSize: number, colorRangeInfo: colorRangeInfoType): number {
    var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
    return (useEndAsStart
        ? (colorEnd - (i * intervalSize))
        : (colorStart + (i * intervalSize)));
}

/* Must use an interpolated color scale, which has a range of [0, 1] */
export function interpolateColors(dataLength: number, colorScale: Function, colorRangeInfo: colorRangeInfoType) {
    var { colorStart, colorEnd } = colorRangeInfo;
    var colorRange = colorEnd - colorStart;
    var intervalSize = colorRange / dataLength;
    var i, colorPoint;
    var colorArray = [];

    for (i = 0; i < dataLength; i++) {
        colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
        colorArray.push(colorScale(colorPoint));
    }
    return colorArray;
}  