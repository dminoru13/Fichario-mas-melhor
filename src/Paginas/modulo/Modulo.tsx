    import type {TipoModulo} from "../../contexto/contexto"
    import { useModulo } from '../../contexto/contexto'

   



  
  
  function Modulo({ id }: { id: string }) {

      const { modulos, adicionarModulo } = useModulo();

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

      function adicionarFilho() {
        const numero = moduloAtual!.ModuloFilho.length + 1;
        adicionarModulo(id, { id: id + "." + numero, ModuloFilho: [] });
      }

      return (
        <div className="modulo">
          <div className="cabecario">
            <p>{id}</p>
            <button onClick={adicionarFilho} className='btnAdd'>+</button>
          </div>

          <div className="filhos">
            {moduloAtual.ModuloFilho.map(filho =>
              <Modulo key={filho.id} id={filho.id} />
            )}
          </div>
        </div>
      );
  }


  
export default Modulo