import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  let news: any =  [];
  const { keyword } = req.query;
  let keywordArray: string[] = []
  if(keyword){
    keywordArray = keyword.toString().split(',')
  }
  console.log(keywordArray)
  
  //G1
  await (async () => {
    try {

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({width: 1080, height: 1024});
      await page.goto("https://g1.globo.com/rn/rio-grande-do-norte/", { timeout: 60000 });
      await page.waitForSelector(".feed-post-body")
      async function scrollInfinito() {
        try {
          let cont = 0
          while (cont < 12) {
            const antesScrollY = await page.evaluate(() => window.scrollY);
            await page.evaluate(() => {
              window.scrollBy(0, window.innerHeight);
            });
            await page.waitForFunction(`${antesScrollY} < window.scrollY`);
            await page.waitForTimeout(1000);
            cont++
          }
        } catch (error) {
          console.error("Ocorreu um erro durante o scroll infinito:", error);
        }
      }
      await scrollInfinito();
      const Newstitle = await page.evaluate(async(keywordArray) => {
        const nodeList = document.querySelectorAll(".feed-post-body")
        const ArrayList = [...nodeList];
        const contentNews = ArrayList.map((content)=>{
          return {
            titulo: content?.querySelector("h2")?.innerText.toLowerCase(),
            link: content?.querySelector("a")?.href,
            descricao: content?.querySelector("p")?.innerText.toLowerCase(),
            blog: "G1"
          }
        })
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      }, keywordArray);
      news =  [...news,...Newstitle]
      await browser.close();
    }catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();

  // BlogdoBG
  await (async () => {
    try{

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.blogdobg.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("article");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          
          const arrayDescricao = content?.querySelector(".entry-content")
          const texts = arrayDescricao?.querySelectorAll("p")
  
          let descricao = "";
          let cont = 0;
  
          texts?.forEach(text =>{  
            if(cont > 1){
              descricao += text.textContent+" ";
            }
            cont++
          })
  
          return {
            titulo: content?.querySelector("h2")?.innerText.toLowerCase(),
            link: content?.querySelectorAll("a")[1]?.href,
            descricao: descricao.toLowerCase(),
            blog: "BlogDoBG"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    }catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // Agora RN
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://agorarn.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("a");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
  
          return {
            titulo: content?.innerText.toLowerCase(),
            link: content?.href,
            descricao: "",
            blog: "Agora RN"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // Justica potiguar
  await (async () => {
    try{

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://justicapotiguar.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("a");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
  
          return {
            titulo: content?.innerText.toLowerCase(),
            link: content?.href,
            descricao: "",
            blog: "Justica potiguar"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    }catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // blogantenado
  await (async () => {
    try{

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://blogantenado.com/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("article");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.querySelector("h2")?.innerText.toLowerCase()
          const descricao = content?.querySelector("p")?.innerText.toLowerCase()
          const link = content?.querySelector("a")?.href
          return {
            titulo,
            link,
            descricao,
            blog: "blogantenado"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // gustavonegreiros
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://gustavonegreiros.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll(".card-body");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.querySelector("h5")?.innerText
          const link = content?.querySelector("a")?.href
          return {
            titulo,
            link,
            descricao: "",
            blog: "gustavonegreiros"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // blogdobarreto
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://blogdobarreto.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll(".elementor-post__card");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.querySelector("h3")?.innerText
          const descricao = content?.querySelector("p")?.innerText
          const link = content?.querySelector("a")?.href
          return {
            titulo,
            link,
            descricao,
            blog: "blogdobarreto"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // vlaudeyliberato
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.vlaudeyliberato.com/");
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("h2");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.innerText
          const link = content?.querySelector("a")?.href
          return {
            titulo,
            link,
            descricao: "",
            blog: "vlaudeyliberato"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  // omossoroense
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.omossoroense.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("a");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.innerText
          const link = content?.href
          return {
            titulo,
            link,
            descricao: "",
            blog: "omossoroense"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();

  // blogpautaaberta
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://blogpautaaberta.blogspot.com/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll(".post");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.querySelector("h3")?.innerText
          let descricao = "";
          content?.querySelector(".post-body")?.querySelector("div")?.querySelectorAll("span")?.forEach(text =>{ descricao += text.innerText+" "})
          const link = content?.querySelector("h3")?.querySelector("a")?.href
          return {
            titulo,
            link,
            descricao,
            blog: "blogpautaaberta"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();

  // portalhd
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.portalhd.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("a");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.innerText
          let descricao = "";
          const link = content?.href
          return {
            titulo,
            link,
            descricao,
            blog: "portalhd"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();

  // jurinews
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://jurinews.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("a");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.innerText
          let descricao = "";
          const link = content?.href
          return {
            titulo,
            link,
            descricao,
            blog: "jurinews"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();

  // direitonews
  await (async () => {
    try{
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.direitonews.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("a");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.innerText
          let descricao = "";
          const link = content?.href
          return {
            titulo,
            link,
            descricao,
            blog: "direitonews"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();

  // tribunadajustica
  await (async () => {
    try{

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://tribunadajustica.com.br/", { timeout: 60000 });
  
      const Newstitle = await page.evaluate((keywordArray) => {
        const nodeList = document.querySelectorAll("li");
        const ArrayList = [...nodeList];
  
        const contentNews = ArrayList.map((content)=>{
          const titulo = content?.querySelector("h3")?.innerText;
          let descricao = content?.querySelector("p")?.innerText;
          const link = content?.querySelector("h3")?.querySelector("a")?.href
          return {
            titulo,
            link,
            descricao,
            blog: "tribunadajustica"
          }
        })
  
        let todosTermo: any = []
        for(let i = 0; i < keywordArray.length; i++){
          const termo = contentNews.filter((content) => content?.titulo?.includes(keywordArray[i].toLowerCase()) || content?.descricao?.includes(keywordArray[i].toLowerCase())); 
          todosTermo = [...todosTermo,...termo]
        }
        return todosTermo;
      },keywordArray);
  
      news =  [...news,...Newstitle]
      await browser.close();
    } catch (error:any){
      console.log('Error occurred:', error.message)
    }
  })();
  
  res.status(200).json({ news });
}
