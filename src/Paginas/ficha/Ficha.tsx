  import { useState } from 'react'
  import './Ficha.css'
  import Modulo from '../modulo/Modulo';
  import type {TipoModulo} from "../../contexto/contexto"
  import { useModulo } from '../../contexto/contexto'


  function Ficha() {
      const { modulos, adicionarModulo } = useModulo();

    return (
       <div className='conteiner'>
          {modulos.map((Carlos) =>
            <Modulo id = {Carlos.id} ModuloFilho = {Carlos.ModuloFilho} />
          )}
      </div>

    )}



  export default Ficha
  


