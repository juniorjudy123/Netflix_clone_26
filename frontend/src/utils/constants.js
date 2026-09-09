export const LOGO = "https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAZge2REfWoSoWRs31izjUdgihldMUslSHTdfz-1aT4vVrgJuVByU92G8wIrBkwULJHWjM1khpzW0xWndigQFYViKFpy-pM6NZFnTKEPkpf9hcdSzCyzqBbcouyIpmgVLbodhaeyqCXaS.svg"


export const API_OPTIONS = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` }
};



export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/"

export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/0ce6c17e-e188-4f13-aaf2-6366e12ba739/web/IN-en-20260803-TRIFECTA-perspective_7730cca2-6324-4104-bf66-1a1f6e1a3e61_large.jpg"


export const SUPPORTED_LANGUAGES = [
    { identifier: 'en', name: "English" },
    { identifier: 'hindi', name: "Hindi" },
    { identifier: 'spanish', name: "Spanish" }
]