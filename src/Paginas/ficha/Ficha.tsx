  import { useState } from 'react'
  import './Ficha.css'
  import Modulo from '../modulo/Modulo';


  export type TipoModulo = {
    id: string;
    conteudo: string;
    numero: number;
    ModuloFilho: TipoModulo[];
  };

  export interface RepetidorModulos {
    modulos: TipoModulo[];
  }



  function Ficha() {

     const [modulos, setModulos] = useState<TipoModulo[]>([
          {id: '1', conteudo: 'aaaa', numero: 1, ModuloFilho: [
              {id: '1.1', conteudo: 'aaaa', numero: 1, ModuloFilho: []},
              {id: '1.1', conteudo: 'aaaa', numero: 1, ModuloFilho: []},
              {id: '1.1', conteudo: 'aaaa', numero: 1, ModuloFilho: []},
              {id: '1.1', conteudo: 'aaaa', numero: 1, ModuloFilho: []}]},
          {id: '1', conteudo: 'aaaa', numero: 1, ModuloFilho: []},
          {id: '1', conteudo: 'aaaa', numero: 1, ModuloFilho: []},
          {id: '1', conteudo: 'aaaa', numero: 1, ModuloFilho: []}
        ])





    return (
       <div className='conteiner'>
      
        {modulos.map((Carlos) =>
          <Modulo id = {Carlos.id} conteudo = {Carlos.conteudo} numero = {Carlos.numero} ModuloFilho = {Carlos.ModuloFilho} />
        )}
      
      </div>

    )
      
     
  }



  export default Ficha
  


