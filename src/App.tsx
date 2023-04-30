import 'css/App.css'
import { Main } from 'components/Main'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useThemeValue } from './context/ThemeModeProvider';
import { RegionProvider } from './context/RegionProvider'

function App() {

  const mode = useThemeValue();

  const theme = createTheme({
    palette: {
      mode
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <RegionProvider>
        <CssBaseline />
        <Main />
      </RegionProvider>
    </ThemeProvider>
  )
}

export default App
