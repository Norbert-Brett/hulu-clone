import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const debounceTimer = useRef(null)

  useEffect(() => {
    if (query.trim().length > 2) {
      // Clear previous timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      // Set new timer for debounced search
      debounceTimer.current = setTimeout(() => {
        fetchSuggestions(query)
      }, 300)
    } else {
      setSuggestions([])
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query])

  const fetchSuggestions = async (searchQuery) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSuggestions(data.results?.slice(0, 5) || [])
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (id) => {
    router.push(`/movie/${id}`)
    setIsOpen(false)
    setQuery('')
    setSuggestions([])
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setSuggestions([])
  }

  return (
    <div className="relative">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex flex-col items-center cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-800/50"
      >
        <MagnifyingGlassIcon className="h-5 w-5 mb-0.5 transition-transform group-hover:scale-110" />
        <p className="text-[10px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">Search</p>
      </button>

      {/* Search Input Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
          {/* Search Bar */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center bg-gray-900 border-2 border-brand rounded-xl overflow-hidden shadow-2xl">
                  <MagnifyingGlassIcon className="h-5 w-5 text-brand ml-4" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies, TV shows..."
                    className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500"
                    autoFocus
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-2 hover:bg-gray-800 rounded-lg mr-2 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-brand text-brand-dark font-bold px-6 py-3 hover:bg-brand/90 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              {(suggestions.length > 0 || isLoading) && (
                <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-400">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-brand"></div>
                    </div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto">
                      {suggestions.map((item) => {
                        const title = item.title || item.name || item.original_name
                        const year = item.release_date || item.first_air_date
                        const posterPath = item.poster_path || item.backdrop_path
                        
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSuggestionClick(item.id)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-b-0"
                          >
                            {posterPath ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${posterPath}`}
                                alt={title}
                                className="w-12 h-16 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-16 bg-gray-800 rounded flex items-center justify-center">
                                <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">{title}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                {year && <span>{new Date(year).getFullYear()}</span>}
                                {item.media_type && (
                                  <>
                                    <span>•</span>
                                    <span className="capitalize">{item.media_type}</span>
                                  </>
                                )}
                                {item.vote_average > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="text-brand">★ {item.vote_average.toFixed(1)}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchBar
