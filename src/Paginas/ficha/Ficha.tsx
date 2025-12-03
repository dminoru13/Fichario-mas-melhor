  import './Ficha.css'
  import Modulo from '../modulo/Modulo';
  import MenuAdd from '../../menus/MenuAdd';
  import { useModulo } from '../../contexto/contexto'


  function Ficha() {
      
      const { modulos, setIdAlvo, menu, setMenu } = useModulo();


    return (
       <div className='conteiner'>

        {menu === "menuAdd" && <MenuAdd/>}

        <div className='menu'>
          <input type="text" name="idAlvo" id="" onChange={(e) => setIdAlvo(e.target.value)} />
          <button onClick={() => console.log(modulos)}>Logar</button>
        </div>
        

        <div className='modulos'>
          {modulos.map((Carlos) =>
            <Modulo id = {Carlos.id} tipo='divisoria'/>
          )}
        </div>

          
      </div>

    )}



  export default Ficha
  


