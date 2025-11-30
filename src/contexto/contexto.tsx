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

    function adicionarModulo(id: string, novoModulo: TipoModulo) {

        if (id.split(".").length === 1)
            {
                setModulos((prev) =>
                prev.map((item) => 

                        item.id === id
                            ? {... item, ModuloFilho: [...item.ModuloFilho, novoModulo] }
                            : item
                    )   
                );
            }
        
        
        //Eu to tentando fazer dar pra adicionar um modulo dentro de um mopdulo dentro de um modulo, atualmente ele só agunta 1 nivel de filho
        

        
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