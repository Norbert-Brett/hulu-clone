function HeaderItem({ Icon, title, onClick }) {
	return (
		<div 
			onClick={onClick}
			className="group flex flex-col items-center cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-800/50"
		>
			<Icon className="h-5 w-5 mb-0.5 transition-transform group-hover:scale-110" />
			<p className="text-[10px] font-medium opacity-70 group-hover:opacity-100 transition-opacity">{title}</p>
		</div>
	)
}

export default HeaderItem
