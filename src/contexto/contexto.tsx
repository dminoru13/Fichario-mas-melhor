  import { createContext, useContext, useState } from "react";
  
  
  export type TipoModulo = {
    id: string;
    ModuloFilho: TipoModulo[];
    tipo: string;
  };



type ModulosContextType = {
  modulos: TipoModulo[];
  adicionarModulo: (id: string, novoModulo: TipoModulo) => void;
  apagarModulo: (idAlvo: string) => void;
  moverModulo: (idOrigem: string, idDestino: string) => void;
  idAtual: string;
  setIdAtual: (v:string) => void;
  idAlvo: string;
  setIdAlvo: (v: string) => void;
  menu: string;
  setMenu: (v:string) => void;
};





  const ContextoModulos = createContext<ModulosContextType | null>(null)


  export function ProvedorModulos({children}: {children: React.ReactNode }) {
    //VARIAVEIS
    const [modulos, setModulos] = useState<TipoModulo[]>([
        {id: '1', ModuloFilho: [],tipo: "divisoria"}]
    )

    const [idAlvo, setidAlvo] = useState("")

    const [idAtual, setIdAtual] = useState("") 

    const [ menu, setMenu] = useState("")



    //FUNÇÕES

    function adicionarModulo(idPai: string, novoModulo: TipoModulo) {

       if (!idPai) {
        console.warn("idPai vazio — nenhum módulo adicionado");
        return;
      }


      const Caminho = idPai.split(".");

      function AdicionarModuloFilho(ArrayModulo: TipoModulo[], CaminhoPartes: string[]): {ArrayAtualizada: TipoModulo[], deuCerto: boolean} {
        let deuCerto = false

        const ArrayAtualizada = ArrayModulo.map(carlos => {
          const apenasNumeroFinal = carlos.id.split(".").pop();
           if (apenasNumeroFinal === CaminhoPartes[0])
            {
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
          console.warn(`adicionarModulo: id "${idPai}" não encontrado - nenhum modulo adicionado`);
          return anterior;
         }
        return ArrayAtualizada;
      })
    }

    function apagarModulo(idAlvo: string) {
        if (!idAlvo) return;

        const partes = idAlvo.split(".");

        function remover(lista: TipoModulo[], partes: string[]): TipoModulo[] {
          if (partes.length === 0) return lista;

          return lista
            .map(item => {
              const final = item.id.split(".").pop();
              if (final === partes[0]) {
                if (partes.length === 1) return null;
                return { ...item, ModuloFilho: remover(item.ModuloFilho, partes.slice(1)) };
              }
              return item;
            })
            .filter(Boolean) as TipoModulo[];
        }

        function reorganizar(lista: TipoModulo[], prefixo = ""): TipoModulo[] {
          return lista.map((item, i) => {
            const id = prefixo ? `${prefixo}.${i + 1}` : `${i + 1}`;
            return { ...item, id, ModuloFilho: reorganizar(item.ModuloFilho, id) };
          });
        }

        setModulos(m => reorganizar(remover(m, partes)));
    }

    function moverModulo(idOrigem: string, idDestino: string) {
      if (!idOrigem || !idDestino) return;

      // Impedir mover para dentro de si mesmo
      if (idDestino.startsWith(idOrigem + ".")) return;

      let moduloMovido: TipoModulo | null = null;

      function remover(lista: TipoModulo[], partes: string[]): TipoModulo[] {
        return lista
          .map(item => {
            const final = item.id.split(".").pop();
            if (final === partes[0]) {
              if (partes.length === 1) {
                moduloMovido = item;
                return null;
              }
              return {
                ...item,
                ModuloFilho: remover(item.ModuloFilho, partes.slice(1))
              };
            }
            return item;
          })
          .filter(Boolean) as TipoModulo[];
      }

      // Inserção: mesmo nível OU inserir como primeiro filho caso o filho não exista
      function inserir(lista: TipoModulo[], partes: string[]): TipoModulo[] {
        const final = partes[0];
        const indice = lista.findIndex(m => m.id.split(".").pop() === final);

        // Caso esteja em nível raiz e não exista → adicionar no fim
        if (partes.length === 1 && indice === -1) {
          const novaLista = [...lista, moduloMovido!];
          return novaLista;
        }

        // Se existe neste nível
        if (indicesIgual(lista, partes[0])) {
          if (partes.length === 1) {
            // inserir antes do item alvo
            const nova = [...lista];
            const idx = nova.findIndex(m => m.id.split(".").pop() === final);
            nova.splice(idx, 0, moduloMovido!);
            return nova;
          }
        }

        // Se o pai existe, mas o filho não → virar primeiro filho
        if (indice !== -1 && partes.length > 1) {
          return lista.map(item => {
            const num = item.id.split(".").pop();
            if (num === final) {
              const next = partes.slice(1);

              // Se o filho não existe → inserir como .1
              const filhoExiste = item.ModuloFilho.some(
                m => m.id.split(".").pop() === next[0]
              );

              if (!filhoExiste) {
                return {
                  ...item,
                  ModuloFilho: [moduloMovido!, ...item.ModuloFilho]
                };
              }

              return {
                ...item,
                ModuloFilho: inserir(item.ModuloFilho, next)
              };
            }
            return item;
          });
        }

        // Nenhum caso bateu → descida normal
        return lista.map(item => {
          const num = item.id.split(".").pop();
          if (num === final) {
            return {
              ...item,
              ModuloFilho: inserir(item.ModuloFilho, partes.slice(1))
            };
          }
          return item;
        });
      }

      function indicesIgual(lista: TipoModulo[], str: string): boolean {
        return lista.some(item => item.id.split(".").pop() === str);
      }

      // Reorganiza IDs após tudo
      function reorganizar(lista: TipoModulo[], prefixo = ""): TipoModulo[] {
        return lista.map((item, i) => {
          const id = prefixo ? `${prefixo}.${i + 1}` : `${i + 1}`;
          return {
            ...item,
            id,
            ModuloFilho: reorganizar(item.ModuloFilho, id)
          };
        });
      }

      // ---------- fluxo principal ---------------
      setModulos(modulosAtuais => {
        const partesOrigem = idOrigem.split(".");
        const partesDestino = idDestino.split(".");

        // 1) Remover origem
        const semOrigem = remover(modulosAtuais, partesOrigem);

        if (!moduloMovido) return semOrigem;

        // 2) Inserir no destino (com regras novas)
        const comMovido = inserir(semOrigem, partesDestino);

        // 3) Reorganizar IDs
        return reorganizar(comMovido);
      });
    }




    return(
        <ContextoModulos.Provider value={{
          modulos,
          adicionarModulo,
          apagarModulo,
          moverModulo,
          idAtual,
          setIdAtual,
          idAlvo,
          setIdAlvo: setidAlvo,
          menu,
          setMenu
        }}>


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