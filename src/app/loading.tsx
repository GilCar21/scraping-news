
export default function Loading(){
  return(
    <div className="flex flex-col gap-4">
      <div className="w-full h-[130px] bg-zinc-800 flex flex-col justify-between  px-4 py-4 rounded-[16px] animate-pulse">
        <div className="bg-zinc-700 h-[18px] w-[50%] rounded-lg"></div>
        <div className="bg-zinc-700 h-[18px] w-[100%] rounded-lg"></div>
        <div className="bg-zinc-700 h-[18px] w-[100%] rounded-lg"></div>
      </div>
      <div className="w-full h-[130px] bg-zinc-800 flex flex-col justify-between  px-4 py-4 rounded-[16px] animate-pulse">
        <div className="bg-zinc-700 h-[18px] w-[50%] rounded-lg"></div>
        <div className="bg-zinc-700 h-[18px] w-[100%] rounded-lg"></div>
        <div className="bg-zinc-700 h-[18px] w-[100%] rounded-lg"></div>
      </div>
      <div className="w-full h-[130px] bg-zinc-800 flex flex-col justify-between  px-4 py-4 rounded-[16px] animate-pulse">
        <div className="bg-zinc-700 h-[18px] w-[50%] rounded-lg"></div>
        <div className="bg-zinc-700 h-[18px] w-[100%] rounded-lg"></div>
        <div className="bg-zinc-700 h-[18px] w-[100%] rounded-lg"></div>
      </div>
    </div>
  )
}