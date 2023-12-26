export const recService = {
    fetchTaboolaRecommendations,
} 

import {storageService} from "./storage.js"

const API_KEY = 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4'
const STORAGE_KEY = 'taboolaDB'
const gTaboolaCache = storageService.loadFromStorage(STORAGE_KEY)
let count = 10


function fetchTaboolaRecommendations() {

    if (gTaboolaCache) return Promise.resolve(gTaboolaCache)

    return fetch(`https://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=${API_KEY}&count=${count}&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html`)
        .then(res => res.json())
        .then(data => {
            console.log(data.list)
            const recommendations = data.list.map(({ name, thumbnail, url, branding }) => ({ name, thumbnail: thumbnail[0], url, branding }))
            storageService.saveToStorage(STORAGE_KEY, recommendations)
            return recommendations
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}




