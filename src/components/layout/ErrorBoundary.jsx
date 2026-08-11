import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('ErrorBoundary', error, info) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050507] flex items-center justify-center p-8 text-center">
          <div className="glass rounded-2xl p-8 max-w-md">
            <div className="font-serif text-2xl text-white">Something went wrong</div>
            <div className="font-mono text-xs text-zinc-500 mt-3">{String(this.state.error)}</div>
            <button onClick={()=>{ localStorage.removeItem('exp_backup_latest'); window.location.reload()}} className="mt-6 px-5 py-2.5 rounded-full bg-white text-black text-sm">Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
