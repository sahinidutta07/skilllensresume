import axios from 'axios'
import { useMemo, useState } from 'react'

const API_URL = 'http://127.0.0.1:5000/analyze'

function isValidResult(data) {
  return (
    data &&
    typeof data.predicted_role === 'string' &&
    data.predicted_role.trim() !== '' &&
    typeof data.match_score === 'number' &&
    Number.isFinite(data.match_score) &&
    Array.isArray(data.detected_skills) &&
    Array.isArray(data.missing_skills) &&
    data.similarity_scores &&
    typeof data.similarity_scores === 'object' &&
    !Array.isArray(data.similarity_scores)
  )
}

function SkillBadge({ label, tone = 'detected' }) {
  const styles =
    tone === 'gap'
      ? 'bg-amber-50 text-amber-800 ring-amber-200'
      : 'bg-sky-50 text-sky-800 ring-sky-200'

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${styles}`}>
      {label}
    </span>
  )
}

function EmptySkills({ message }) {
  return <p className="text-sm text-slate-500">{message}</p>
}

export default function App() {
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const similarityRows = useMemo(() => {
    if (!result?.similarity_scores) return []
    return Object.entries(result.similarity_scores).sort((a, b) => b[1] - a[1])
  }, [result])

  async function handleAnalyze(event) {
    event.preventDefault()
    const text = resumeText.trim()

    if (!text) {
      setResult(null)
      setError('Please paste your resume before analyzing.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await axios.post(
        API_URL,
        { resume_text: text },
        { headers: { 'Content-Type': 'application/json' }, timeout: 20000 },
      )

      if (!isValidResult(response.data)) {
        setError('The API returned an unexpected response. Please try again.')
        return
      }

      setResult(response.data)
    } catch (requestError) {
      if (!requestError.response) {
        setError('Backend unavailable. Make sure the Flask server is running at http://127.0.0.1:5000.')
      } else if (requestError.response.data?.error) {
        setError(requestError.response.data.error)
      } else {
        setError('Unable to analyze the resume. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setResumeText('')
    setResult(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-6 sm:px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l5 5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">SkillLens</h1>
            <p className="text-sm text-slate-500 sm:text-base">
              AI-Powered Resume Skill & Career Analysis
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Resume input</h2>
          <p className="mt-1 text-sm text-slate-500">
            Paste your resume text. SkillLens will extract skills, predict a role, and highlight gaps.
          </p>

          <form className="mt-4 space-y-4" onSubmit={handleAnalyze}>
            <textarea
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste your resume here. Include skills, tools, and experience (for example: Python, Pandas, SQL, React, Node.js)."
              rows={10}
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-inner outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              disabled={loading}
            />

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {loading ? 'Analyzing...' : 'Analyze Resume'}
              </button>

              {result ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </form>
        </section>

        {loading ? (
          <section className="rounded-2xl border border-indigo-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
            <p className="font-medium text-indigo-700">Analyzing your resume...</p>
            <p className="mt-1 text-sm text-slate-500">Matching skills with TF-IDF, cosine similarity, and logistic regression.</p>
          </section>
        ) : null}

        {result && !loading ? (
          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Recommended Role</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{result.predicted_role}</h3>
              <p className="mt-2 text-sm text-slate-500">Predicted from your resume using the SkillLens classifier.</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Match Score</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-semibold text-indigo-700">{result.match_score}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600"
                  style={{ width: `${Math.max(0, Math.min(100, result.match_score))}%` }}
                />
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-base font-semibold text-slate-900">Detected Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.detected_skills.length ? (
                  result.detected_skills.map((skill) => <SkillBadge key={skill} label={skill} />)
                ) : (
                  <EmptySkills message="No skills were detected in this resume." />
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-base font-semibold text-slate-900">Skill Gaps</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.missing_skills.length ? (
                  result.missing_skills.map((skill) => <SkillBadge key={skill} label={skill} tone="gap" />)
                ) : (
                  <EmptySkills message="No missing skills for the predicted role." />
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Role Similarity</h3>
              <p className="mt-1 text-sm text-slate-500">Cosine similarity between your resume and each role profile.</p>
              <div className="mt-4 space-y-3">
                {similarityRows.map(([role, score]) => {
                  const percent = Math.max(0, Math.min(100, Number(score) * 100))
                  return (
                    <div key={role}>
                      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium text-slate-700">{role}</span>
                        <span className="tabular-nums text-slate-500">{percent.toFixed(1)}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-teal-500" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          </section>
        ) : null}
      </main>
    </div>
  )
}
