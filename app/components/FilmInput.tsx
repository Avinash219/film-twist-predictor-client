"use client"
import { memo } from "react";
import { useFilmAnalysis } from "../hooks/useFilmAnalysis"
import { twistResultStore } from "@/lib/store";

export const FilmInput = memo(() => {
  const {loading,fieldValue,fieldError,fetchDetails,updateFieldValue} = useFilmAnalysis()
  const history = twistResultStore(state => state.history)

  const showResult = (filmInput : string) => {
    fetchDetails(true,filmInput)
  }

  return (
   <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
  <h1 className="text-4xl font-bold text-white tracking-tight">
    AI Film Twist Predictor
  </h1>
  {Object.keys(history).length > 0 && (
  <>
    <p className="text-gray-400 text-sm uppercase tracking-widest mt-10 mb-3 w-full max-w-md">
      History
    </p>
    {Object.keys(history).map((key) => (
      <div key={key} className="w-full max-w-md">
        <button 
          onClick={() => showResult(key)}
          className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
        >
          {key}
        </button>
      </div>
    ))}
  </>
)}
  <p className="text-gray-400 mt-3 text-lg text-center max-w-md">
    Enter a film name or plot — AI will predict the twist and explain why it works.
  </p>
  <input className="mt-8 w-full max-w-md px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-violet-500" placeholder="Enter Movie name or Plot" type="text"
  onChange={(e) => updateFieldValue(e.target.value)} value={fieldValue}/>
  {fieldError && <p className="text-red-400 text-sm mt-1 w-full max-w-md">{fieldError}</p>}
  <button className="mt-4 w-full max-w-md py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors" 
  type="button" onClick={() => fetchDetails(false)}
  disabled={loading}>{!loading ? "Submit" : "Analyzing..."}</button>
</main>
  );
})

// Set a display name for React DevTools and linting
FilmInput.displayName = "FilmInput"