'use strict'

function onInit() {
    loadRecommendations()
}

function loadRecommendations(){
    fetchTaboolaRecommendations()
        .then(taboolaData => renderRecommendations(taboolaData))
        .catch(error => console.error('Error in onInit:', error))
}

function renderRecommendations(recs) {
    document.querySelector('.error-container').style.display = 'none'

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
        </li>
    `
    )

    document.querySelector('.rec-list').innerHTML = strHTML.join('')
}

function onDeleteRecommendation(event, index) {
    event.stopPropagation()
    const recommendations = loadFromStorage(STORAGE_KEY) || []
    recommendations.splice(index, 1)
    saveToStorage(STORAGE_KEY, recommendations)
    renderRecommendations(recommendations)
}``

function renderError() {
    const elErrContainer = document.querySelector('.error-container')
    const elBtn = elErrContainer.querySelector('button')
    elBtn.onclick = loadRecommendations()
    elErrContainer.style.display = 'block'
}



