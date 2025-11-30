    import { useState } from 'react'
    import type {TipoModulo} from "../../contexto/contexto"
    import { useModulo } from '../../contexto/contexto'

   



  
  
  function Modulo({ id, ModuloFilho}: TipoModulo) {
    
    const { modulos, adicionarModulo } = useModulo();

    function contarId (id:string) {
      console.log(id.split(".").length)
    }

    function ListarModulos() {
        adicionarModulo(id, {id: "1.1", ModuloFilho: []})
        console.log(modulos)
    }


    return(
      <div className='modulo'>
        <div className='cabecario'>
                <p>
                  {id}
                </p>

              <button className='botaoAdd' onClick={ListarModulos}> + </button>

              <button className='botaoAdd' onClick={() => contarId(id)}> ListarID </button>
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