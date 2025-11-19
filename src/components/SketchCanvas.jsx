import { useEffect, useMemo, useRef, useState } from 'react'

export default function SketchCanvas() {
  const [prompt, setPrompt] = useState('Dashboard with header, user avatar, cards and a bar chart')
  const [svg, setSvg] = useState('')
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(960)
  const [height, setHeight] = useState(560)
  const [theme, setTheme] = useState('slate')
  const [seed, setSeed] = useState(0)

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchSketch = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/sketch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, width, height, theme, seed })
      })
      const data = await res.json()
      setSvg(data.svg)
    } catch (e) {
      setSvg(`<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'><rect width='100%' height='100%' fill='#111827'/><text x='16' y='32' fill='#fff'>Failed to reach backend: ${e.message}</text></svg>`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSketch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadSvg = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sketch.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-slate-800/40 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-4">
        <div className="flex-1">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to sketch..."
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-blue-100 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="rounded-lg bg-slate-900/60 border border-slate-700 text-blue-100 px-3 py-2">
            <option value="slate">Slate</option>
            <option value="sand">Sand</option>
          </select>
          <button onClick={() => setSeed((s) => s + 1)} className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-blue-100 hover:border-blue-500">Reroll</button>
          <button onClick={fetchSketch} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60" disabled={loading}>{loading ? 'Sketching...' : 'Generate'}</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <label className="flex items-center gap-2 text-blue-200/80">
          <span className="w-20">Width</span>
          <input type="number" value={width} min={320} max={1600} onChange={(e) => setWidth(parseInt(e.target.value || '0'))} className="flex-1 rounded bg-slate-900/60 border border-slate-700 text-blue-100 px-2 py-1"/>
        </label>
        <label className="flex items-center gap-2 text-blue-200/80">
          <span className="w-20">Height</span>
          <input type="number" value={height} min={240} max={1200} onChange={(e) => setHeight(parseInt(e.target.value || '0'))} className="flex-1 rounded bg-slate-900/60 border border-slate-700 text-blue-100 px-2 py-1"/>
        </label>
        <div className="flex items-center justify-end">
          <button onClick={downloadSvg} className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-blue-100 hover:border-blue-500">Download SVG</button>
        </div>
      </div>

      <div className="w-full overflow-auto rounded-xl border border-slate-700 bg-slate-900/60">
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="p-12 text-blue-200/80">Describe a layout and hit Generate</div>
        )}
      </div>
    </div>
  )
}
