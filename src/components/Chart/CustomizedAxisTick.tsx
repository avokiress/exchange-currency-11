type CustomizedAxisTickType = {
    x?: Number,
    y?: Number,
    payload?: { value: any }
}

const CustomizedAxisTick: React.FC<CustomizedAxisTickType> = ({ x, y, payload }) => {
    return (<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#aaa" transform="rotate(-45)" fontSize="smaller">
            {payload?.value}
        </text>
    </g>);
}

export default CustomizedAxisTick;