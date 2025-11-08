import Thumbnail from "./Thumbnail"
import FlipMove from "react-flip-move"

function Results(results) {
	const Array = results.results
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<FlipMove className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.map(result =>(
					<Thumbnail key={result.id} result={result}/>
				))}
			</FlipMove>
		</div>
	)
}

export default Results
