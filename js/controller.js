import { recService } from "./services/recService.js"
import {storageService} from "./services/storage.js"

export const recController = {
    onInit,
    loadRecommendations,
    renderRecommendations,
    onDeleteRecommendation,
    renderError
}

const STORAGE_KEY = 'taboolaDB' // for testing only

document.body.onload = onInit;

function onInit() {
    loadRecommendations()
}

function loadRecommendations(){
    recService.fetchTaboolaRecommendations()
        .then(taboolaData => renderRecommendations(taboolaData))
        .catch(error => renderError())
}

function renderRecommendations(recs) {

    let strHTML = recs.map(
        (rec, index) => `    
        <li class="rec-card">
            <a target="_blank" href="${rec.url}">
                <img class="thumbnail" src="${rec.thumbnail.url}" alt="${rec.name}" onerror="() => this.onerror = null; this.src='assets/img/default.jpg'">
                <article>
                    <span class="branding">${rec.branding}</span>
                    <p>${rec.name}</p>
                </article>
                </a>
                <button class="delete-btn" onclick="onDeleteRecommendation(event, ${index})">X</button> 
        </li>`
    )

    document.querySelector('.rec-list').innerHTML = strHTML.join('')
}

function onDeleteRecommendation(event, index) {
    event.stopPropagation()
    const recommendations = storageService.loadFromStorage(STORAGE_KEY) || []
    recommendations.splice(index, 1)
    storageService.saveToStorage(STORAGE_KEY, recommendations)
    renderRecommendations(recommendations)
  }

window.onDeleteRecommendation = onDeleteRecommendation // this function was added to the global scope (window object), because of type module

function renderError() {
    const elErrContainer = document.querySelector('.error-container')
    const elBtn = elErrContainer.querySelector('button')
    elBtn.onclick = storageService.loadRecommendations
    elErrContainer.style.display = 'flex'
}


