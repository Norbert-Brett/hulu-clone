import HeaderItem from "./HeaderItem"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import { HomeIcon, UserIcon, BoltIcon ,TrophyIcon} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

function Header() {
	const router = useRouter()

	return (
		<header className="sticky top-0 z-50 w-full bg-brand-darker/95 backdrop-blur-sm border-b border-gray-800/50 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-3">
					<div 
						className="cursor-pointer"
						onClick={() => router.push('/')}
					>
						<Logo />
					</div>
					<nav className="flex items-center gap-1 text-brand">
						<HeaderItem title='Home' Icon={HomeIcon} onClick={() => router.push('/')} />
						<HeaderItem title='Trending' Icon={BoltIcon} onClick={() => router.push('/?genre=fetchTrending')} />
						<HeaderItem title='Top Rated' Icon={TrophyIcon} onClick={() => router.push('/?genre=fetchTopRated')} />
						<SearchBar />
						<HeaderItem title='Account' Icon={UserIcon} onClick={() => router.push('/auth')} />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
