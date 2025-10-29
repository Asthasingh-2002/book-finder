"use client"

// SearchBar component - handles user input and search submission
import { useState } from "react"

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("")

  /**
   * Handles form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate input is not empty
    if (input.trim() === "") {
      alert("Please enter a book title")
      return
    }

    // Call parent component's search handler
    onSearch(input)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by book title (e.g., 'The Great Gatsby')"
          className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
