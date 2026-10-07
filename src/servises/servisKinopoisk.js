const ApiKey = import.meta.env.VITE_KINOPOISK_API_KEY;

const headers={
    'X-API-KEY': ApiKey,
    'Content-Type': 'application/json',
}

export async function getFilms(yearFrom,yearTo){
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=YEAR&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=${yearFrom}&yearTo=${yearTo}&page=1`
        ,{headers}
    )
    if(!response.ok){
        throw new Error (`ошибка загрузки: ${response.status}`)
    }
    const data = await response.json()
    return data.items
}
export async function getFilmById(id){
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
        { headers } 
    ) 
    if(!response.ok){ 
        throw new Error(`ошибки загрузки ${response.status}`)
    }
    return await response.json() 
}