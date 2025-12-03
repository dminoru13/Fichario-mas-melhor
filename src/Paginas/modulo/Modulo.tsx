    import type {TipoModulo} from "../../contexto/contexto"
    import { useModulo } from '../../contexto/contexto'

   

//DANIEL, PROGRAMA OS MODULOS AGORA, FAZ O "EDITAR DESING DOS MODULOS" DEPOIS

  
  
  function Modulo({ id, tipo }: { id: string, tipo: string }) {

      const { modulos, apagarModulo, moverModulo, idAlvo, setIdAtual, setMenu } = useModulo();

      function encontrar(id: string, lista: TipoModulo[]): TipoModulo | null {
        for (const item of lista) {
          if (item.id === id) return item;
          const f = encontrar(id, item.ModuloFilho);
          if (f) return f;
        }
        return null;
      }

      const moduloAtual = encontrar(id, modulos);
      if (!moduloAtual) return null;

      



      if(tipo === "divisoria")
      {
        return (
        <div className="modulo">
          <div className="cabecario">
            <p>{id}</p>
            <div className="divBtn">
              <button onClick={() => apagarModulo(id)} className='btnAdd'>X</button>
              <button onClick={() => moverModulo(id, idAlvo)} className='btnAdd'>{"=>"}</button>
              <button onClick={() => {setIdAtual(id); setMenu("menuAdd")}} className='btnAdd'> +</button>
           
            </div>
            
          </div>

          <div className="filhos">
            {moduloAtual.ModuloFilho.map(filho =>
              <Modulo key={filho.id} id={filho.id} tipo = {filho.tipo} />
            )}
          </div>
        </div>
      );
      }

      else{
        return(
          <div className="modulo">
            <div className="cabecario">
              <div className="divBtn">
              <button onClick={() => apagarModulo(id)} className='btnAdd'>X</button>
              <button onClick={() => moverModulo(id, idAlvo)} className='btnAdd'>{"=>"}</button>
            </div>
            </div>
            <input type="text" />
          </div>
        )
      }

      
  }


  
export default Modulo