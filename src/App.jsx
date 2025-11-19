import SketchCanvas from './components/SketchCanvas'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <img src="/flame-icon.svg" alt="Flames" className="w-16 h-16 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Text-to-Sketch Generator</h1>
            <p className="text-blue-200">Describe an interface and instantly get a hand-drawn style wireframe.</p>
          </div>

          <SketchCanvas />

          <div className="mt-6 text-center text-sm text-blue-300/60">
            Tip: Try prompts like "landing page with header, hero, signup form and three feature cards".
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
