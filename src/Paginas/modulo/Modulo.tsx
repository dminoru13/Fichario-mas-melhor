    import { useState } from 'react'
    import type {TipoModulo} from "../../contexto/contexto"
  
  
  function Modulo({ id, ModuloFilho}: TipoModulo) {

    return(
      <div className='modulo'>
        <div className='cabecario'>
                <p>
                  {id}
                </p>

              <button className='botaoAdd'> + </button>
        </div>

        <div className='filhos'>
          {ModuloFilho.map((Carlos) =>
          <Modulo id = {Carlos.id} ModuloFilho = {Carlos.ModuloFilho} />
        )}
        </div>
      </div>
    )



  }

  
  export default Modulo