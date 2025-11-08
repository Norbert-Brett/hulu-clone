import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { 
  PlayIcon, 
  PlusIcon, 
  HandThumbUpIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  FilmIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function MovieDetail({ movie, credits }) {
  const router = useRouter()
  const BASE_URL = "https://image.tmdb.org/t/p/original/"

  if (router.isFallback) {
    return <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="text-brand text-2xl">Loading...</div>
    </div>
  }

  const backdropImage = movie.backdrop_path || movie.poster_path
  const posterImage = movie.poster_path || movie.backdrop_path
  const title = movie.title || movie.name || movie.original_name
  const releaseDate = movie.release_date || movie.first_air_date
  const runtime = movie.runtime || movie.episode_run_time?.[0]
  const director = credits?.crew?.find(person => person.job === 'Director')
  const cast = credits?.cast?.slice(0, 6) || []

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Head>
        <title>{title} - Nulu</title>
        <meta name="description" content={movie.overview} />
      </Head>

      <Header />

      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img
            src={`${BASE_URL}${backdropImage}`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-brand-dark via-transparent to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="shrink-0">
              <img
                src={`${BASE_URL}${posterImage}`}
                alt={title}
                className="w-48 md:w-64 rounded-xl shadow-2xl border-2 border-gray-800/50"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-4">
              <button
                onClick={() => router.back()}
                className="text-gray-400 hover:text-brand transition-colors mb-4 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                {releaseDate && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-brand" />
                    <span>{new Date(releaseDate).getFullYear()}</span>
                  </div>
                )}
                {runtime && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-brand" />
                    <span>{runtime} min</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <StarIconSolid className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-gray-500">({movie.vote_count} votes)</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800/80 rounded-full text-sm text-gray-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center gap-2 px-8 py-3 bg-brand text-brand-dark font-bold rounded-lg hover:bg-brand/90 transition-all transform hover:scale-105">
                  <PlayIcon className="w-6 h-6" />
                  Play
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 text-white rounded-lg hover:bg-gray-700 transition-all">
                  <PlusIcon className="w-6 h-6" />
                  Watchlist
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 text-white rounded-lg hover:bg-gray-700 transition-all">
                  <HandThumbUpIcon className="w-6 h-6" />
                  Like
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Overview</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
            {movie.overview}
          </p>
        </div>

        {/* Director & Cast */}
        <div className="grid md:grid-cols-2 gap-8">
          {director && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Director</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                {director.profile_path ? (
                  <img
                    src={`${BASE_URL}${director.profile_path}`}
                    alt={director.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                    <FilmIcon className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{director.name}</p>
                  <p className="text-sm text-gray-400">{director.job}</p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Details</h3>
            <div className="space-y-2 p-4 bg-gray-800/50 rounded-lg">
              {movie.status && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white font-medium">{movie.status}</span>
                </div>
              )}
              {movie.original_language && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white font-medium uppercase">{movie.original_language}</span>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget:</span>
                  <span className="text-white font-medium">
                    ${movie.budget.toLocaleString()}
                  </span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="text-white font-medium">
                    ${movie.revenue.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Cast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {cast.map(person => (
                <div key={person.id} className="space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
                    {person.profile_path ? (
                      <img
                        src={`${BASE_URL}${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FilmIcon className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{person.name}</p>
                    <p className="text-xs text-gray-400 truncate">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const API_KEY = process.env.API_KEY

  try {
    // Fetch movie details
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    const movie = await movieRes.json()

    // Fetch credits (cast & crew)
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
    )
    const credits = await creditsRes.json()

    return {
      props: {
        movie,
        credits,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
