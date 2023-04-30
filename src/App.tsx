import 'css/App.css'
import { Main } from 'components/Main'
import { RegionProvider } from './context/RegionProvider'

function App() {
  return (
    <>
      <RegionProvider>
        <Main />
      </RegionProvider>
    </>
  )
}

export default App
