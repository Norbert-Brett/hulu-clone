import Thumbnail from "./Thumbnail"
import FlipMove from "react-flip-move"

function Results(results) {
	const Array = results.results
	return (
		<FlipMove className="px-5 my-10 gap-3 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
			{Array.map(result =>(
				<Thumbnail key={result.id} result={result}/>
			))}
		</FlipMove>
	)
}

export default Results
