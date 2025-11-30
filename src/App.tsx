import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Ficha from './Paginas/ficha/Ficha'
import { ProvedorModulos } from './contexto/contexto'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProvedorModulos>
      <Ficha/>
    </ProvedorModulos>
    </>
  )
}

export default App
