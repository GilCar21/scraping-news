"use client"
import { useState, Suspense } from "react"
import Loading from "./loading";

export default  function Home() {
  
  const [keyword,setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataNews,setDataNews] = useState<[]>([]);
 
  async function handNews(){
    setLoading(true)
    const res: any = await (await fetch(`/api/scraping-news?keyword=${keyword}`)).json()
    console.log(res)
    setDataNews(res.news)
    setLoading(false)
  }

  return (
    <div className="w-full h-full">
      <div className="mx-auto max-w-[1440px] py-6">
        <header className="mb-8">
          <h1 className="font-bold text-[26px] ">Buscador de notícias em sites e blogs</h1>
        </header>
        <main >
          <p className="mb-[4px] text-[18px]">Busque por notícias</p>
          <span className="text-[12px] text-zinc-400">Para buscar por notícias digite os textos ou palavras e separe por vírgula se estiver procurando por mais de uma frase ou palavra (exemplo: TJRN,Tribunal de Justiça,Tribunal de Justiça do Rio Grande do Norte)</span>
          <div className="mb-8 flex items-center ">
            <input type="text-[18px] text-" placeholder="digite aqui" 
              onChange={(e)=>setKeyword(e.target.value)} value={keyword}
              className="text-zinc-900 px-[8px] py-[4px] placeholder:text-zinc-500 placeholder:text-[18px] w-[500px] rounded-s" 
            />
            <button onClick={handNews} className="bg-teal-700 mr-2 px-[8px] py-[4px] rounded-e text-[18px]">Buscar</button>
          </div>
            {
              loading ?
                <>
                  <p className="text-zinc-400 text-[18px]">Fazendo pesquisa nos sites, isso pode levar um tempo</p>
                  <Loading/>
                </>
                :
                <ul className="flex flex-col gap-4">
                  {
                    dataNews.map((noticia: any, index: number) => {
                      return(
                        <li key={index}>
                          <a href={noticia.link} target="_blanck" className="flex flex-col gap-2 border-[1px] border-zinc-100 px-4 py-2 rounded-[16px]">
                            <p className="text-[22px] text-slate-400">Portal: <span className="text-zinc-50">{noticia.blog}</span></p>
                            <p className="text-[22px] text-slate-400">Titulo: <span className="text-zinc-50">{noticia.titulo}</span></p>
                            <p className="text-[22px] text-slate-400">Descrição: <span className="text-zinc-50">{noticia.descricao.substr(1,230)}{noticia.descricao.length > 230 && "..."}</span></p>
                          </a>
                        </li>
                      )
                    })
                  }
                 </ul>
            }
        </main>
      </div>
    </div>
  )
}
