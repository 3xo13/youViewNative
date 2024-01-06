const changeYoutubeUrl = (url) => {
	const baseUrl = 'https://www.youtube.com/embed/'
	const seg = url.slice(url.lastIndexOf('/') + 1)
	const newUrl = baseUrl + seg
	return newUrl
}

export default changeYoutubeUrl
