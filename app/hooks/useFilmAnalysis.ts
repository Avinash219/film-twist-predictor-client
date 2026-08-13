"use client"
import { twistResultStore } from "@/lib/store"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export const useFilmAnalysis = () => {
    const router = useRouter()
    const [fieldValue,setFieldValue] = useState<string>('')
    const [fieldError,setFieldError] = useState<string>('')
    const setResult = twistResultStore((state) => state.setResult)
    const addToHistory = twistResultStore((state) => state.addToHistory)
    const history = twistResultStore((state) => state.history)
    const loading = twistResultStore((state) => state.loading)
    const setLoading = twistResultStore((state) => state.setLoading)
    const abortControllerRef = useRef<AbortController | null>(null)
    const appendResult = twistResultStore((state) => state.appendResult)
    
const fetchResult = async () => {
    try {
        const res = await fetch("/api/analyze", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"filmInput": fieldValue.trim()}),
            signal: abortControllerRef.current?.signal
        })

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()

        while(reader) {
            const { done, value } = await reader.read()
            if(done) break
            const chunk = decoder.decode(value)
            appendResult(chunk)
        }
        
        addToHistory(fieldValue.trim(), twistResultStore.getState().result)
        
    } catch(error) {
        if(error instanceof DOMException && error.name === "AbortError") return
        const errorMessage = error instanceof Error ? error.message : String(error)
        setFieldError(errorMessage)
    } finally {
        setLoading(false)
    }
}
     const {mutate} = useMutation({
      mutationFn : fetchResult,
      onSuccess : () => {
        
      }
    })

    const fetchDetails = async (searchHistory = false,filmInput = '') => {
    if(searchHistory) {
      const res = history[filmInput]
      setResult(res)
      router.push('/results')
      return
    }
    setResult('')
    if(!fieldValue.trim().length){
      setFieldError("Field value is mandatory")
      return
    }
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()
    router.push('/results')
    mutate()
  }

  const updateFieldValue = (value : string) => {
    setFieldError('')
    setFieldValue(value)
  }

    return {
        fieldValue,
        fieldError,
        loading,
        fetchDetails,
        updateFieldValue,
    }
}