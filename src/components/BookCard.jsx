function BookCard({ book }) {
  // Extract book data with fallbacks for missing information
  const title = book.title || "Unknown Title"
  const author = book.author_name?.[0] || "Unknown Author"
  const year = book.first_publish_year || "N/A"

  // Construct book cover image URL from Open Library API
  // Uses cover_i property or falls back to ISBN
  const coverId = book.cover_i || book.isbn?.[0]
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x225?text=No+Cover"

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      {/* Book Cover Image */}
      <div className="relative bg-slate-100 h-48 overflow-hidden">
        <img
          src={coverUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150x225?text=No+Cover"
          }}
        />
      </div>

      {/* Book Information */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{title}</h3>

        {/* Author */}
        <p className="text-sm text-slate-600 mb-3">
          <span className="font-medium">Author:</span> {author}
        </p>

        {/* Publish Year */}
        <p className="text-sm text-slate-500 mt-auto">
          <span className="font-medium">Published:</span> {year}
        </p>
      </div>
    </div>
  )
}

export default BookCard
