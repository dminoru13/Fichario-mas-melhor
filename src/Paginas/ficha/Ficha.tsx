  import './Ficha.css'
  import Modulo from '../modulo/Modulo';
  import { useModulo } from '../../contexto/contexto'
  import { useState } from 'react';


  function Ficha() {
      
      const { modulos, setIdAlvo } = useModulo();

    return (
       <div className='conteiner'>
        <input type="text" name="idAlvo" id="" onChange={(e) => setIdAlvo(e.target.value)} />


          {modulos.map((Carlos) =>
            <Modulo id = {Carlos.id} tipo='divisoria'/>
          )}
      </div>

    )}



  export default Ficha
  


