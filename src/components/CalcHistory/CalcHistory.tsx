// @ts-ignore
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import { useHistory } from "../../context";

const CalcHistory: React.FC = () => {
    const { history, open } = useHistory();

    return (<>
        <Collapse in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Convertation history
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell align="right">Total price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((historyRow, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {historyRow.dateAdd.toLocaleString()}
                                </TableCell>
                                <TableCell align="right">{historyRow.amount}</TableCell>
                                <TableCell>{historyRow.from}</TableCell>
                                <TableCell>{historyRow.to}</TableCell>
                                <TableCell align="right">
                                    {historyRow.result}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Collapse>
    </>);
}

export default CalcHistory;