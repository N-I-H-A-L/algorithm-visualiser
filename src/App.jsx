import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Graphs from './pages/Graphs';
import Sorting from './pages/Sorting';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{title} Visualizer</h1>
    <p style={{ color: 'var(--text-muted)' }}>Module under active development.</p>
    <a href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>← Back to Home</a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/trees" element={<PlaceholderPage title="Trees & Hierarchical Structures" />} />
            <Route path="/dynamic-programming" element={<PlaceholderPage title="Dynamic Programming" />} />
            <Route path="/backtracking" element={<PlaceholderPage title="Backtracking & Recursion" />} />
            <Route path="/searching" element={<PlaceholderPage title="Searching & Intervals" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;