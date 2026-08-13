import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FilmResultHistory  = Record<string,string>

export interface TwistResult {
    result: string;
    setResult: (value: string) => void;
    history : FilmResultHistory;
    addToHistory : (key : string , value : string) => void
    loading : boolean;
    setLoading : (value : boolean) => void
    appendResult :(value : string) => void
}

export const twistResultStore = create<TwistResult>()(persist((set) => ({
    result : '',
    history : {},
    loading : false,
    setResult : (value : string) => set({result : value}),
    addToHistory : (key : string , value : string) => set((state) => ({history : {...state.history,[key] : value}})),
    setLoading : (value : boolean) => set({loading : value}),
    appendResult: (value: string) => set((state) => ({result: state.result + value}))
}),{
    name : 'twist-history',
    partialize : (state) => ({history : state.history})
}));