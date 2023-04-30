
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';


export const SharedButtons = (text: string) => (
  <>
    <Button sx={{ border: '1px solid #1976d2', marginRight: '10px' }} onClick={() => window.open(`whatsapp://send?text=${text}`)}>
      Share
      <WhatsAppIcon />
    </Button>
    <Button sx={{ border: '1px solid #1976d2' }} onClick={() => window.open(`https://t.me/share/url?url=http://localhost:8000/&text=${text}`)}>
      Share
      <TelegramIcon />
    </Button>
  </>
);