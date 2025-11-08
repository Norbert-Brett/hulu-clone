import HeaderItem from "./HeaderItem"
import { HomeIcon ,CheckBadgeIcon ,MagnifyingGlassIcon,UserIcon,RectangleStackIcon,BoltIcon } from '@heroicons/react/24/outline'

function Header() {
	return (
		<header className=" w-full flex flex-col sm:flex-row m-5 justify-evenly items-center h-auto">
			<div className="flex items-center grow justify-evenly max-w-2xl text-green-400 ">
				<HeaderItem title='Home' Icon={HomeIcon} />
				<HeaderItem title='Trending' Icon={BoltIcon} />
				<HeaderItem title='Verified' Icon={CheckBadgeIcon} />
				<HeaderItem title='Collections' Icon={RectangleStackIcon} />
				<HeaderItem title='Search' Icon={MagnifyingGlassIcon} />
				<HeaderItem title='Account' Icon={UserIcon} />

			</div>
			<img
				className="object-contain"
				src="https://images.squarespace-cdn.com/content/v1/583efce6b8a79bc809cc05b3/1639492895954-VXX7I9UFF98JEZPIR7P1/Hulu_Logo.svg.png?format=500w"
				width={100}
				height={100}
				lazy
			/>

		</header>
	)
}

export default Header
