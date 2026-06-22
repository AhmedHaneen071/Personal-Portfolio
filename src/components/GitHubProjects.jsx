import { useState, useEffect } from 'react'

const GITHUB_USER = 'AhmedHaneen071'

function getLangClass(lang) {
  const map = { JavaScript: 'js-lang', HTML: 'html-lang', CSS: 'css-lang', TypeScript: 'ts-lang' }
  return map[lang] || ''
}

function getLangIcon(lang) {
  const map = {
    JavaScript: 'fa-solid fa-code',
    HTML: 'fa-brands fa-html5',
    CSS: 'fa-brands fa-css3-alt',
    TypeScript: 'fa-solid fa-code',
    Python: 'fa-brands fa-python',
    'C#': 'fa-solid fa-code',
  }
  return map[lang] || 'fa-solid fa-folder'
}

function formatRepoName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setRepos(data.filter((r) => !r.fork))
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (repos.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const cards = document.querySelectorAll('.repos-grid .repo-card')
    cards.forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [repos])

  if (error) {
    return (
      <section id="github" className="github-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Open Source</div>
            <h2>GitHub Projects</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            Failed to load GitHub repositories.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="github-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Open Source</div>
          <h2>GitHub Projects</h2>
        </div>

        <div className="repos-grid">
          {repos.map((repo) => {
            const lang = repo.language || 'Unknown'
            const isFeatured = repo.name === 'Task-Hub'

            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`repo-card${isFeatured ? ' featured' : ''}`}
              >
                <div className="repo-icon"><i className={getLangIcon(lang)}></i></div>
                <h3>{formatRepoName(repo.name)}</h3>
                <p>{repo.description || 'No description provided.'}</p>
                <div className="repo-meta">
                  <span className={`repo-lang ${getLangClass(lang)}`}>{lang}</span>
                  {isFeatured && (
                    <span className="repo-stars"><i className="fa-solid fa-star"></i> {repo.stargazers_count}</span>
                  )}
                  <span className="repo-link">View Repo <i className="fa-solid fa-arrow-right"></i></span>
                </div>
              </a>
            )
          })}
        </div>

        <div className="github-cta">
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <i className="fa-brands fa-github"></i> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
