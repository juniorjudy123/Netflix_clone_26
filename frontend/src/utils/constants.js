export const LOGO = "https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAZge2REfWoSoWRs31izjUdgihldMUslSHTdfz-1aT4vVrgJuVByU92G8wIrBkwULJHWjM1khpzW0xWndigQFYViKFpy-pM6NZFnTKEPkpf9hcdSzCyzqBbcouyIpmgVLbodhaeyqCXaS.svg"


export const API_OPTIONS = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` }
};



export const GEMINI_API_KEY = import.meta.VITE_TMDB_API_KEY
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/"