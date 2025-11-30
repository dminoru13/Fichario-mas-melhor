    import { useState } from 'react'
    import type {TipoModulo, RepetidorModulos} from "../ficha/Ficha"
  
  
  function Modulo({ id, conteudo, numero, ModuloFilho}: TipoModulo) {

    return(
      <div className='modulo'>
        <p>
          {id}
        </p>
        
        {ModuloFilho.map((Carlos) =>
          <Modulo id = {Carlos.id} conteudo = {Carlos.conteudo} numero = {Carlos.numero} ModuloFilho = {Carlos.ModuloFilho} />
        )}

      </div>
    )



  }

  
  export default Modulo