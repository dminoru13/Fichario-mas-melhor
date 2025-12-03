    import { useState } from 'react'
    import type {TipoModulo} from "../../contexto/contexto"
    import { useModulo } from '../../contexto/contexto'

   



  
  
  function Modulo({ id, ModuloFilho}: TipoModulo) {
    
    const { modulos, adicionarModulo } = useModulo();

    function adicionarFilho() {
        adicionarModulo(id, {id: id + "." + (ModuloFilho.length+1), ModuloFilho: []})
        console.log(modulos)
    }


    return(
      <div className='modulo'>
        <div className='cabecario'>
                <p>
                  {id}
                </p>

              <button className='botaoAdd' onClick={adicionarFilho}> + </button>
        </div>

        <div className='filhos'>
          {ModuloFilho.map((Carlos) =>
          <Modulo key={Carlos.id} id = {Carlos.id} ModuloFilho = {Carlos.ModuloFilho} />
        )}
        </div>
      </div>
    )



  }

  
  export default Modulo