import { useEffect, useState } from "react"

const BackendTest = () => {
	const [message, setMessage] = useState("")

	useEffect(() => {
		const getBackendMessage = async () => {
			const response = await fetch("http://127.0.0.1:8000/api/hello/")

			const data = await response.json()

			setMessage(data.message)
		}

		getBackendMessage()
	}, [])

	return <h1>{message}</h1>
}

export default BackendTest
