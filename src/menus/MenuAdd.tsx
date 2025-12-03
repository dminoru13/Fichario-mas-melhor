import './MenuAdd.css'
import { useModulo } from '../contexto/contexto'
import type { TipoModulo } from '../contexto/contexto';

function MenuAdd() {

    const { setMenu, adicionarModulo,idAtual, modulos } = useModulo();

    function adicionarFilho(tipo: string) {
        const numero = moduloAtual!.ModuloFilho.length + 1;
        adicionarModulo(idAtual, { id: idAtual + "." + numero, ModuloFilho: [], tipo: tipo });
        setMenu("");
      }
    
     function encontrar(id: string, lista: TipoModulo[]): TipoModulo | null {
              for (const item of lista) {
                if (item.id === id) return item;
                const f = encontrar(id, item.ModuloFilho);
                if (f) return f;
              }
              return null;
            }
      
    const moduloAtual = encontrar(idAtual, modulos);


    return (
        <div className="menuAddOverlay">
            <div className="menuAddBox">

                <button className="btnClose" onClick={() => setMenu("")}>X</button>
                
                <div className="cabecario">
                    <p className="titulo">Adicionar Módulo</p>
                </div>

                <div className="botoes">
                                  <button onClick={() => adicionarFilho("divisoria")} className='btnAdd'>+</button>
                                <button onClick={() => adicionarFilho("TXT")} className='btnAdd'>TXT</button>
                </div>

            </div>
        </div>
    );
}

export default MenuAdd;
