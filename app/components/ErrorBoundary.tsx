"use client"
import Link from "next/link";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props,State> {
    constructor(props : Props) {
        super(props)
        this.state = {hasError : false}
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    goBack = () => {
        this.setState({hasError : false},() => {
            window.location.href = "/"
        })
    }

    render () {
        if(this.state.hasError) {
            return(        
                <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
                  <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 text-center">
                    <p className="text-red-400 text-xl font-semibold mb-2">Something went wrong</p>
                    <p className="text-gray-400 text-sm mb-6">An unexpected error occurred. Please try again.</p>
                    <button className="inline-block px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors" onClick={this.goBack}>
                      Go to Search
                    </button>
                  </div>
                </main>
            )
        }
        return this.props.children
    }
}