  import { useState } from 'react'
  import viteLogo from '/vite.svg'
  //import './Ficha.css'


  type Modulos = {
    modulo: string[];
    numero: number;
  };



  export function Repetidor({modulo, numero}: Modulos){
    return(
      <div>
        {modulo.map((modulo, i) => (
          <div className='modulo'>
            <p key={i}>{modulo}</p>
            <input type="number" value = {i}/>
            <p>{numero}</p>
          </div>
          
        ))}
      </div>
    )
  }


  function Ficha() {

    const [pagina, setPagina] = useState([''])
    const [valorInput, setValorInput] = useState('')
    
    function adicionar() {
      setPagina(prev => [...prev, valorInput])
    }

    return (
      <>
        <div>
          <button onClick={adicionar}>MAIS amor</button>

          <input type="text" value={valorInput} onChange={e => setValorInput(e.target.value)}/>

          <Repetidor modulo = {pagina} numero = {1}/>
        </div>
      </>
    )
  }

  export default Ficha
