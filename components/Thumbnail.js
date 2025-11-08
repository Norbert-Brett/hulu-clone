import { HandThumbUpIcon } from "@heroicons/react/24/outline"
import { forwardRef } from "react"
import { useRouter } from "next/router"

const Thumbnail = forwardRef(({result}, ref) => {
	const BASE_URL = "https://image.tmdb.org/t/p/original/"
	const router = useRouter()

	const handleClick = () => {
		router.push(`/movie/${result.id}`)
	}

	return (
		<div 
			ref={ref}
			onClick={handleClick}
			className="group cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 hover:z-10"
		>
			<div className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-brand/50 transition-all duration-300">
				<div className="relative aspect-video overflow-hidden">
					<img
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						src={`${BASE_URL}${result.backdrop_path || result.poster_path}`}
						alt={result.name || result.title}
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
				</div>
				
				<div className="p-4 space-y-2">
					<h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-brand transition-colors duration-200">
						{result.title || result.original_name}
					</h3>
					
					<p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
						{result.overview}
					</p>
					
					<div className="flex items-center gap-3 text-xs text-gray-500 pt-2">
						{result.media_type && (
							<span className="px-2 py-1 bg-gray-800/80 rounded-full capitalize">
								{result.media_type}
							</span>
						)}
						{(result.release_date || result.first_air_date) && (
							<span>{result.release_date || result.first_air_date}</span>
						)}
						<div className="flex items-center gap-1 ml-auto text-brand">
							<HandThumbUpIcon className="h-4 w-4" />
							<span className="font-medium">{result.vote_count}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})

Thumbnail.displayName = 'Thumbnail'

export default Thumbnail
