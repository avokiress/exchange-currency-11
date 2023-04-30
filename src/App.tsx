import 'css/App.css'
import { Main } from 'components/Main'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  return (
    <ThemeProvider theme={theme}> 
    <CssBaseline />
      <Main />
    </ThemeProvider>
  )
}

export default App
