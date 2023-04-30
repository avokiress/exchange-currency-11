import { ToggleButton } from "@mui/material";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { useHistory } from "../../context";

const CalcHistoryToggleButton: React.FC = () => {
    const { open, setOpen } = useHistory();
    return (<ToggleButton
        value={true}
        selected={open}
        onChange={() => {
            setOpen(prevState => !prevState);
        }}
    >
        <HistoryToggleOffIcon />
    </ToggleButton>);
}

export default CalcHistoryToggleButton;