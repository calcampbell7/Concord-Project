import { useState } from 'react'
import './App.css'

function App() {
  const [exclusionWords, setExclusionWords] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)


  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try{
      const response = await fetch('/api/concordance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exclusion_words: exclusionWords,
        body_text: bodyText,
      }),
    })

    if (!response.ok) {
      throw new Error('The concordance could not be generated.')
    }

    const data = await response.json()
    setOutput(data.output)
    setCopied(false)

    }catch(error){
      setError(error.message)
    }finally{
      setIsLoading(false)

    }

  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setError('The output could not be copied.')
    }
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <h1>Concordance generator</h1>
        <p>
          A Key Word in Context (KWIC) concordance highlights important words
          and displays the text surrounding them. This makes index entries and
          search results easier to scan and understand.
        </p>
        <p>
          For more info about KWIC, click{' '}
          <a
            href="https://en.wikipedia.org/wiki/Key_Word_in_Context"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          . To get started, paste the text you want to format into the body-text
          field. Then enter any words you want excluded, one per line, in the
          exclusion-words field.
        </p>
      </header>

      <form className="concordance-form" onSubmit={handleSubmit}>
        <section className="input-grid" aria-label="Concordance input">
          <div className="field-card exclusions-card">
            <div className="field-heading">
              <div>
                <label htmlFor="exclusion-words">Exclusion words</label>
                <p>Enter one word per line.</p>
              </div>
              <span>{exclusionWords.split(/\s+/).filter(Boolean).length} words</span>
            </div>

            <textarea
              id="exclusion-words"
              value={exclusionWords}
              onChange={(event) => {
                const cleanedValue = event.target.value.replace(/[ \t]+/g, '')
                setExclusionWords(cleanedValue)
              }}
              placeholder={'the\na\nand\nof\nto'}
              spellCheck="false"
              
            />
          </div>

          <div className="field-card body-card">
            <div className="field-heading">
              <div>
                <label htmlFor="body-text">Body text</label>
                <p>Paste the text you want to index.</p>
              </div>
              <span>{bodyText.length} characters</span>
            </div>

            <textarea
              id="body-text"
              value={bodyText}
              onChange={(event) => setBodyText(event.target.value)}
              placeholder="Paste or type your text here…"
            />
          </div>
        </section>

        <div className="form-actions">
          <button
            className="clear-button"
            type="button"
            onClick={() => {
              setExclusionWords('')
              setBodyText('')
              setOutput('')
              setError('')
              setCopied(false)
            }}
          >
            Clear
          </button>
          <button className="generate-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Generating..': 'Generate concordance'}
          </button>
        </div>
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) }

      </form>

      <section className="output-card" aria-labelledby="output-heading">
        <div className="output-heading">
          <div>
            <p className="eyebrow">Result</p>
            <h2 id="output-heading">Concordance output</h2>
          </div>
          <button type="button" disabled={!output} onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy output'}
          </button>
        </div>
        <pre className="output-placeholder">
         {output || "Your generated concordance will appear here."}
        </pre>
      </section>
    </main>
  )
}

export default App
