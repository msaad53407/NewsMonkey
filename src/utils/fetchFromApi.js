

export const fetchFromApi = async (endpoint, country, query, category, page) => {
    try {
        const API_KEY = '3d69e1c9a8784d14bb4c9a56dea65a0a';
        const baseUrl = 'https://newsapi.org/v2'
        const response = await fetch(`${baseUrl}/${endpoint}?apiKey=${API_KEY}&pageSize=20&page=${page}${country ? '&country=' + country : ''}${query ? '&q=' + query : ''}${category ? '&category=' + category : ''}`)
        const data = await response.json()
        return {
            error: false,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            data: 'Some Error Occurred. Please try again later.'+ error.message
        }
    }
}