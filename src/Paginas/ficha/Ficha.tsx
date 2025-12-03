  import './Ficha.css'
  import Modulo from '../modulo/Modulo';
  import { useModulo } from '../../contexto/contexto'


  function Ficha() {
      const { modulos, adicionarModulo } = useModulo();

    return (
       <div className='conteiner'>
          {modulos.map((Carlos) =>
            <Modulo id = {Carlos.id} tipo='divisoria'/>
          )}
      </div>

    )}



  export default Ficha
  


