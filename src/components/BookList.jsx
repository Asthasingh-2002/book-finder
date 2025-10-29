import BookCard from "./BookCard"

function BookList({ books }) {
  return (
    <div>
      {/* Results Count */}
      <p className="text-slate-600 mb-6">
        Found <span className="font-semibold text-slate-900">{books.length}</span> books
      </p>

      {/* Responsive Grid Layout
          - 1 column on mobile
          - 2 columns on tablet (sm: 640px)
          - 3 columns on desktop (lg: 1024px)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookList
