import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SharedNavbar from '../components/SharedNavbar';

const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting Visualizer',
    description: 'Explore comparison and non-comparison sorts. Step through quicksort pivots, merge partitions, and heap structures.',
    path: '/sorting',
    tag: 'Fundamental',
    complexity: 'O(N log N)',
    algorithms: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Insertion Sort']
  },
  {
    id: 'graphs',
    title: 'Graph & Pathfinding',
    description: 'Traverse weighted and unweighted grids with Dijkstra, A*, BFS, and DFS. Watch heuristics find the shortest path.',
    path: '/graphs',
    tag: 'Spatial',
    complexity: 'O(V + E)',
    algorithms: ['Dijkstra', 'BFS / DFS', 'A* Search', "Kruskal's MST"]
  },
  {
    id: 'trees',
    title: 'Trees & Data Structures',
    description: 'Observe real-time tree rotations, self-balancing mechanics, and traversals across binary and multi-way trees.',
    path: '/trees',
    tag: 'Structures',
    complexity: 'O(log N)',
    algorithms: ['AVL Trees', 'Red-Black Trees', 'Trie', 'Min/Max Heap']
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Visualize memoization and tabulation tables filling up step-by-step to break down optimal substructure problems.',
    path: '/dynamic-programming',
    tag: 'Optimization',
    complexity: 'O(N × W)',
    algorithms: ['0/1 Knapsack', 'Longest Common Subsequence', 'Coin Change', 'Edit Distance']
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    description: 'Watch state-space trees expand and prune dead ends dynamically through recursive exploration.',
    path: '/backtracking',
    tag: 'Search',
    complexity: 'Exponential',
    algorithms: ['N-Queens', 'Sudoku Solver', 'Knight’s Tour', 'Maze Generation']
  },
  {
    id: 'searching',
    title: 'Searching & Intervals',
    description: 'Interactive pointer steps across sorted and un-indexed datasets using binary division and 2-pointer techniques.',
    path: '/searching',
    tag: 'Core',
    complexity: 'O(log N)',
    algorithms: ['Binary Search', 'Ternary Search', 'Quickselect', 'Two Pointers']
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAlgos = algorithmCategories.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.algorithms.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && item.tag.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="landing-container">
      <div className="glow-orb orb-primary" />
      <div className="glow-orb orb-secondary" />

      {/* Global Persistent Navbar */}
      <SharedNavbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <span className="pulse-circle" /> Interactive Algorithm Studio
        </div>
        <h1 className="hero-title">
          Experience Algorithms in <span className="gradient-text">Real Time</span>
        </h1>
        <p className="hero-subtitle">
          A modern playground to visualize step-by-step state transitions, inspect time complexities,
          and gain computational intuition across computer science algorithms.
        </p>

        {/* Search */}
        <div className="search-wrapper" id="explore">
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search algorithms (e.g., Dijkstra, Quick Sort, N-Queens)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-group">
          {['All', 'Fundamental', 'Spatial', 'Structures', 'Optimization', 'Search'].map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <main className="grid-section">
        <div className="cards-grid">
          {filteredAlgos.length > 0 ? (
            filteredAlgos.map((algo) => (
              <Link to={algo.path} key={algo.id} className="algo-card">
                <div className="card-header">
                  <span className="tag-badge">{algo.tag}</span>
                  <span className="complexity-badge">{algo.complexity}</span>
                </div>

                <h3 className="card-title">{algo.title}</h3>
                <p className="card-desc">{algo.description}</p>

                <div className="sub-algos">
                  {algo.algorithms.map((name) => (
                    <span key={name} className="algo-chip">{name}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <span className="launch-text">Launch Visualizer</span>
                  <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))
          ) : (
            <div className="empty-state">
              <h3>No matching algorithms found</h3>
              <p>Try searching for "Binary Search", "Graphs", or "Knapsack".</p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Engineered for intuitive computational learning. Zero latency visualizers.</p>
      </footer>
    </div>
  );
}