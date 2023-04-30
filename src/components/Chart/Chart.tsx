import { useEffect, useState } from "react";
import { apilayerService } from "../../service";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomizedAxisTick from "./CustomizedAxisTick";
import { interpolateInferno } from "d3-scale-chromatic"
import { interpolateColors } from "../../utils/colorGenerator";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

type ChartProps = {
    base: string,
    symbols: string[],
    startDate: Date,
    endDate: Date
}

type RatesRowType = {
    [index: string]: string
}

const Chart: React.FC<ChartProps> = ({ startDate, endDate, base, symbols }) => {
    const [data, setData] = useState<Object[]>([]);
    useEffect(() => {
        apilayerService.getTimeseries(startDate, endDate, base, symbols).then((responce) => {
            let chartData = [];
            const { rates } = responce;
            for (let date in rates) {
                const normalizedRates = Object.keys(rates[date]).reduce((acc: RatesRowType, symbol: string) => {
                    acc[symbol] = (1 / rates[date][symbol]).toFixed(4);
                    return acc;
                }, {});
                chartData.push({
                    name: date,
                    ...normalizedRates
                })
            }
            setData(chartData);
        })
    }, []);


    if (!data.length) {
        return <>Loading chart data...</>;
    }

    const colors = interpolateColors(symbols.length, interpolateInferno, {
        colorStart: 0,
        colorEnd: 1,
        useEndAsStart: false,
    });

    return (<Box>
        <Typography variant="h6" gutterBottom component="div">
            Chart of changes in {base} versus {symbols.join(',')}
        </Typography>
        <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" height={80} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {symbols.map((item, index) => <Line type="monotone" dataKey={item} key={item} stroke={colors[index]} dot={false} />)}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    </Box>);
}
export default Chart;