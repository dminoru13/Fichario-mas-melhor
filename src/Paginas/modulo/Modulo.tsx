    import type {TipoModulo} from "../../contexto/contexto"
    import { useModulo } from '../../contexto/contexto'

   



  
  
  function Modulo({ id, tipo }: { id: string, tipo: string }) {

      const { modulos, adicionarModulo, apagarModulo, moverModulo, idAlvo } = useModulo();

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

      function adicionarFilho(tipo: string) {
        const numero = moduloAtual!.ModuloFilho.length + 1;
        adicionarModulo(id, { id: id + "." + numero, ModuloFilho: [], tipo: tipo });
      }



      if(tipo === "divisoria")
      {
        return (
        <div className="modulo">
          <div className="cabecario">
            <p>{id}</p>
            <div className="divBtn">
              <button onClick={() => adicionarFilho("divisoria")} className='btnAdd'>+</button>
              <button onClick={() => adicionarFilho("TXT")} className='btnAdd'>TXT</button>
              <button onClick={() => apagarModulo(id)} className='btnAdd'>X</button>
              <button onClick={() => moverModulo(id, idAlvo)} className='btnAdd'>{"=>"}</button>
           
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
            aaaaaaaaa
          </div>
        )
      }

      
  }


  
export default Modulo