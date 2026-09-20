const Shimmer = () => {
	return (
		<div className="min-h-screen bg-black px-6 py-8 animate-pulse">
			{/* Header shimmer */}
			<div className="mb-8 flex items-center justify-between">
				<div className="h-8 w-32 rounded bg-gray-800" />
				<div className="h-8 w-24 rounded bg-gray-800" />
			</div>

			{/* Hero shimmer */}
			<div className="mb-10 space-y-5">
				<div className="h-12 w-2/3 rounded bg-gray-800" />
				<div className="h-4 w-full max-w-xl rounded bg-gray-800" />
				<div className="h-4 w-5/6 max-w-lg rounded bg-gray-800" />

				<div className="flex gap-4">
					<div className="h-10 w-28 rounded bg-gray-800" />
					<div className="h-10 w-28 rounded bg-gray-800" />
				</div>
			</div>

			{/* Movie cards shimmer */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
				{Array.from({ length: 12 }).map((_, index) => (
					<div key={index} className="h-64 rounded bg-gray-800" />
				))}
			</div>
		</div>
	)
}

export default Shimmer
