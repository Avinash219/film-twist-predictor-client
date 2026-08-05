"use client"
import { twistResultStore } from "@/lib/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { SkeletonLoader } from "./SkeletonLoader"

export default function Page(){
    const result = twistResultStore(state => state.result)
    const loading = twistResultStore(state => state.loading)

    return (
        <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-12">
       <div className="mt-8 w-full max-w-2xl bg-gray-800 rounded-xl p-6 text-gray-200 mx-auto">
  {loading ? <SkeletonLoader /> :      
  <ReactMarkdown components={{
  h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-3">{children}</h1>,
  h2: ({children}) => <h2 className="text-xl font-semibold text-violet-400 mt-4 mb-2">{children}</h2>,
  h3: ({children}) => <h3 className="text-lg font-semibold text-gray-200 mt-3 mb-1">{children}</h3>,
  p: ({children}) => <p className="text-gray-300 mb-2 leading-relaxed">{children}</p>,
  hr: () => <hr className="border-gray-600 my-4"/>,
  strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
}}>{result}</ReactMarkdown>
}
<Link className="mt-4 inline-block px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors" href="/">
Go to Search
</Link>
</div>
</main>
    )
}