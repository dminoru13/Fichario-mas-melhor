  import { useState } from 'react'
  import viteLogo from '/vite.svg'
  import './Ficha.css'


  type Modulo = {
    id: string;
    conteudo: string;
  };

  interface RepetidorModulos {
    modulos: Modulo[];
  }






  function Ficha() {
    const [nomeModulo, setnomeModulo] = useState('')
    const [conteudoModulo, setConteudoModulo] = useState('')

    const [modulos, setModulos] = useState<Modulo[]>([
      {id: "1", conteudo: ""},
      {id: "2", conteudo: ""}
    ])
    
    return (
        <div>

          <input type="text" value={nomeModulo} onChange={e => setnomeModulo(e.target.value)}/>
          <p>conteudo:</p>
          <input type="text" value={conteudoModulo} onChange={e => setConteudoModulo(e.target.value)}/>

          <div className='conteiner'>
          {modulos.map((modulo) => (
            <div className='id' key={modulo.id}>
              <p>{modulo.id}</p>
              <p>{modulo.conteudo}</p>
              <button>atualizar conteudo</button>

              
            </div>
            
          ))}
        </div>

    )
  }

  export default Ficha
