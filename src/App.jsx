"use client";

// Main App component - orchestrates the book finder functionality
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";

function App() {
  // State management for books, loading, and error states
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  /**
   * Fetches books from Open Library API
   * @param {string} title - The book title to search for
   */
  const handleSearch = async (title) => {
    // Reset states before new search
    setLoading(true);
    setError("");
    setBooks([]);
    setSearched(true);

    try {
      // Construct API URL with the search title
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      // Check if results exist
      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs);
      } else {
        setError("No books found. Try a different search term.");
      }
    } catch (err) {
      setError("Error fetching books. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 text-center">
            📚 Book Finder
          </h1>
          <p className="text-center text-slate-600 mt-2">
            Discover your next favorite book
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar Component */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">Searching for books...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* No Results State */}
        {searched && !loading && books.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              Start searching to discover books!
            </p>
          </div>
        )}

        {/* Book List Component */}
        {books.length > 0 && <BookList books={books} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-600 text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Open Library API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
