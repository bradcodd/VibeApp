import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [systemInfo, setSystemInfo] = useState<{ date: string | null, source: string | null }>({ date: null, source: null });

  useEffect(() => {
    fetch('/api/system-date')
      .then(res => res.json())
      .then(data => {
        if (data.date) {
          setSystemInfo({
            date: data.date, // Use raw server string
            source: data.source
          });
        } else if (data.fallbackDate) {
          setSystemInfo({
            date: new Date(data.fallbackDate).toLocaleString(),
            source: data.source || 'Offline'
          });
        }
      })
      .catch(err => console.error('Failed to fetch date:', err));
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">VibeApp</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="cta-small">Get Started</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Experience the <span className="gradient-text">Future</span> of Web</h1>
            <p className="hero-subtitle">
              Build faster, scale better, and delight your users with our premium platform.
            </p>
            <div className="hero-actions">
              <button className="cta-primary">Start Building</button>
              <button className="cta-secondary">Learn More</button>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2>Why Choose Us</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>⚡ Lightning Fast</h3>
              <p>Optimized for speed and performance out of the box.</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Premium Design</h3>
              <p>Beautifully crafted components that look great on any device.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Secure by Default</h3>
              <p>Enterprise-grade security to keep your data safe.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 VibeApp. All rights reserved.</p>
        {systemInfo.date && (
          <p className="system-date">
            <span className="date-label">System Date:</span> {systemInfo.date}
            <span className="separator"> | </span>
            <span className="source-label">Source:</span> {systemInfo.source}
          </p>
        )}
      </footer>
    </div>
  )
}

export default App
