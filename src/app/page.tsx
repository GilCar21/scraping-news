"use client"
import { useEffect, useState } from "react"

export default function Home() {

  const [keyword,setKeyword] = useState('');
  const [dataNews,setDataNews] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  async function handleGetData(){
    setLoading(true)
    const res: any = await (await fetch(`/api/scraping-news?keyword=${keyword}`)).json()
    setDataNews(res.news)
    setLoading(false)
  }

  console.log(dataNews)

  return (
    <div className="w-full h-full">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-8">
          <h1 className="font-bold text-lg ">Buscador de noticias em sites e blogs</h1>
        </header>
        <main >
          <p>Busque pelos por palavras chaves</p>
          <input type="text" className="text-zinc-900" onChange={(e)=>setKeyword(e.target.value)}/>
          <button onClick={handleGetData}>buscar</button>
          {
            loading ?
              <p>carregando ...</p>
            :
              <div>
                {
                  dataNews.length && 
                  dataNews.map((noticia: any, index: number) => {
                    return(
                      <div key={index}>
                        <p>{noticia.titulo}</p>
                        <p>{noticia.descricao}</p>
                        <p>{noticia.link}</p>
                        <p>{noticia.blog}</p>
                      </div>
                    )
                  })
                }
              </div>
          }

        </main>
      </div>
    </div>
  )
}
