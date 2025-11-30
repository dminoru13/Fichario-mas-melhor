  import { useState } from 'react'
  import './Ficha.css'
  import Modulo from '../modulo/Modulo';
  import type {TipoModulo} from "../../contexto/contexto"


  function Ficha() {

     const [modulos, setModulos] = useState<TipoModulo[]>([
          {id: '1', ModuloFilho: []}]
        )

    return (
       <div className='conteiner'>
          {modulos.map((Carlos) =>
            <Modulo id = {Carlos.id} ModuloFilho = {Carlos.ModuloFilho} />
          )}
      </div>

    )}



  export default Ficha
  


