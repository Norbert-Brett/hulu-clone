import requests from '../utils/requests'
import { useRouter } from 'next/router'

function Navbar() {
	const router = useRouter();
	const currentGenre = router.query.genre;
	
  return (
    <nav className="relative bg-brand-dark/50 backdrop-blur-sm border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex px-6 sm:px-8 py-4 text-lg whitespace-nowrap space-x-8 overflow-x-scroll scrollbar-hide">
          {Object.entries(requests).map(([key, { title, url }]) => (
            <button
              key={key}
              onClick={() => router.push(`/?genre=${key}`)}
              className={`cursor-pointer transition-all duration-200 font-medium px-4 py-2 rounded-full ${
                currentGenre === key 
                  ? 'text-brand-dark bg-brand scale-105' 
                  : 'text-gray-300 hover:text-brand hover:bg-gray-800/50'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      <div className='absolute top-0 right-0 bg-linear-to-l from-brand-dark h-full w-20 pointer-events-none' />
    </nav>
  )
}

export default Navbar
