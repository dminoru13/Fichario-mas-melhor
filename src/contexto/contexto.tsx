  import { createContext, useContext, useState } from "react";
  
  
  export type TipoModulo = {
    id: string;
    ModuloFilho: TipoModulo[];
  };



type ModulosContextType = {
  modulos: TipoModulo[];
  adicionarModulo: (id: string, novoModulo: TipoModulo) => void;
};





  const ContextoModulos = createContext<ModulosContextType | null>(null)


  export function ProvedorModulos({children}) {
    const [modulos, setModulos] = useState<TipoModulo[]>([
        {id: '1', ModuloFilho: []}]
    )

    function adicionarModulo(idPai: string, novoModulo: TipoModulo) {

       if (!idPai) {
        console.warn("idPai vazio — nenhum módulo adicionado");
        return;
      }


      const Caminho = idPai.split(".");

      function AdicionarModuloFilho(ArrayModulo: TipoModulo[], CaminhoPartes: string[]): {ArrayAtualizada: TipoModulo[], deuCerto: boolean} {
        let deuCerto = false

        const ArrayAtualizada = ArrayModulo.map(carlos => {
          if (carlos.id === CaminhoPartes[0]) {
            if (CaminhoPartes.length === 1) {
              deuCerto = true;
              return {...carlos, ModuloFilho: [...carlos.ModuloFilho, novoModulo]}
            }
            else {
              const { ArrayAtualizada: NovoFilho, deuCerto: FilhoEncontrado } = AdicionarModuloFilho(carlos.ModuloFilho, CaminhoPartes.slice(1));

              if (FilhoEncontrado) deuCerto = true;
              return {...carlos, ModuloFilho: NovoFilho};
            }
          }
          else {
            return carlos;
          }
        });
        return {ArrayAtualizada, deuCerto}
      }
      
      setModulos(anterior => {
        const {ArrayAtualizada, deuCerto} = AdicionarModuloFilho(anterior, Caminho)
         if(!deuCerto){
          console.warn('adicionarModulo: id "${id}" não encontrado - nenhum modulo adicionado');
          return anterior;
         }
        return ArrayAtualizada;
      })


      
        
        

        
    }

    return(
        <ContextoModulos.Provider value={{modulos, adicionarModulo}}>
            {children}
        </ContextoModulos.Provider>
        );
  }


export function useModulo() {
  const contexto = useContext(ContextoModulos);

  if (!contexto) {
    throw new Error("useModulo deve ser usado dentro de ProvedorModulos");
  }

  return contexto;
}