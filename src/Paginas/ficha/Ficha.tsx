  import { useState } from 'react'
  import viteLogo from '/vite.svg'
  import './Ficha.css'


  type Modulo = {
    id: string;
    conteudo: string;
    numero: number;
  };

  interface RepetidorModulos {
    modulos: Modulo[];
  }








  function Ficha() {
    const [conteudoModulo, setConteudoModulo] = useState('')

    const [modulos, setModulos] = useState<Modulo[]>([

    ])



    function AdicionarModulo() {
      const novoId = (modulos.length +1).toString()

        setModulos((prev) => [
          ...prev,
          {id: novoId, conteudo: "", numero: 0}
        ]);

    };


    function AtualizarConteudo(id: string) {
          setModulos((prev) =>
            prev.map((mod) => 
            mod.id === id
          ? {...mod, conteudo: conteudoModulo}
          :mod
        )
            
          )
    }




    
    return (
        <div>
          <button onClick={AdicionarModulo}>Adicionar Modulo</button>
          <p>conteudo:</p>
          <input type="text" value={conteudoModulo} onChange={e => setConteudoModulo(e.target.value)}/>

          <div className='conteiner'>
          {modulos.map((modulo) => (
            <div className='modulo' key={modulo.id}>
              <p>{modulo.id}</p>
              <p>{modulo.conteudo}</p>
              <button onClick={() => AtualizarConteudo(modulo.id)}>atualizar conteudo</button>
            </div>
            
          ))}
        </div>
      </div>

    )
  }

  export default Ficha
