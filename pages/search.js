import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Thumbnail from '../components/Thumbnail'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Search({ results, query }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Head>
        <title>{query ? `Search: ${query}` : 'Search'} - Nulu</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MagnifyingGlassIcon className="h-8 w-8 text-brand" />
            <h1 className="text-3xl font-bold text-white">
              Search Results
            </h1>
          </div>
          {query && (
            <p className="text-gray-400 text-lg">
              Showing results for: <span className="text-brand font-semibold">"{query}"</span>
            </p>
          )}
          {results && (
            <p className="text-gray-500 mt-2">
              Found {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          )}
        </div>

        {/* Results Grid */}
        {results && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map(result => (
              <Thumbnail key={result.id} result={result} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MagnifyingGlassIcon className="h-24 w-24 text-gray-700 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              No results found
            </h2>
            <p className="text-gray-500 max-w-md">
              {query 
                ? `We couldn't find any movies or TV shows matching "${query}". Try different keywords.`
                : 'Enter a search query to find movies and TV shows.'
              }
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-3 bg-brand text-brand-dark font-bold rounded-lg hover:bg-brand/90 transition-all"
            >
              Browse All Content
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { q } = context.query
  const API_KEY = process.env.API_KEY

  if (!q) {
    return {
      props: {
        results: [],
        query: '',
      },
    }
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(q)}&page=1&include_adult=false`
    )
    const data = await response.json()

    return {
      props: {
        results: data.results || [],
        query: q,
      },
    }
  } catch (error) {
    return {
      props: {
        results: [],
        query: q,
      },
    }
  }
}
