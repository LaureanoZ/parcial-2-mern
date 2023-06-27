import { createPage } from '../pages/utils.js'

function createSectionMobilePage(data) {
    let html = `<nav><ul>
    <li><a href="mobile">mobile</a></li>
    <li><a href="landing">landing page</a></li>
    <li><a href="webapp">web app</a></li>
    <li><a href="ecommerce">e-commerce</a></li>
    <li><a href="game">games</a></li>
    </ul></nav>`
    html += `<h2>${data[0].name}</h2>`
    html += `<p>Descripción: ${data[0].description}</p>`
    html += `<p>Tecnologias:`
    html += `<ul>`
    for (let i = 0; i < data[0].technologies.length; i++) {
        html += `<li>${data[0].technologies[i]}</li>`
    }
    html += `</ul>`
    html += `<p>Link al repositorio: <a href="${data[0].link}"><b>¡Aqui!</b></a></p>`
    html += `<div class="image"><img src="${data[0].img}" alt="${data[0].name}"></div>`
    return createPage('Mobile', html)
}
function createSectionLandingPage(data) {
    let html = `<nav><ul>
    <li><a href="mobile">mobile</a></li>
    <li><a href="landing">landing page</a></li>
    <li><a href="webapp">web app</a></li>
    <li><a href="ecommerce">e-commerce</a></li>
    <li><a href="game">games</a></li>
    </ul></nav>`
    html += `<h2>${data[1].name}</h2>`
    html += `<p>Descripción: ${data[1].description}</p>`
    html += `<p>Tecnologias:`
    html += `<ul>`
    for (let i = 0; i < data[1].technologies.length; i++) {
        html += `<li>${data[1].technologies[i]}</li>`
    }
    html += `</ul>`
    html += `<p>Link al repositorio: <a href="${data[1].link}"><b>¡Aqui!</b></a></p>`
    html += `<div class="image"><img src="${data[1].img}" alt="${data[1].name}"></div>`

    return createPage('Landing Page', html)
}
function createSectionWebApp(data) {
    let html = `<nav><ul>
    <li><a href="mobile">mobile</a></li>
    <li><a href="landing">landing page</a></li>
    <li><a href="webapp">web app</a></li>
    <li><a href="ecommerce">e-commerce</a></li>
    <li><a href="game">games</a></li>
    </ul></nav>`
    html += `<h2>${data[2].name}</h2>`
    html += `<p>Descripción: ${data[2].description}</p>`
    html += `<p>Tecnologias:`
    html += `<ul>`
    for (let i = 0; i < data[2].technologies.length; i++) {
        html += `<li>${data[2].technologies[i]}</li>`
    }
    html += `</ul>`
    html += `<p>Link al repositorio: <a href="${data[2].link}"><b>¡Aqui!</b></a></p>`
    html += `<div class="image"><img src="${data[2].img}" alt="${data[2].name}"></div>`

    return createPage('Web App', html)
}

function createSectionECommerce(data) {
    let html = `<nav><ul>
    <li><a href="mobile">mobile</a></li>
    <li><a href="landing">landing page</a></li>
    <li><a href="webapp">web app</a></li>
    <li><a href="ecommerce">e-commerce</a></li>
    <li><a href="game">games</a></li>
    </ul></nav>`
    html += `<h2>${data[3].name}</h2>`
    html += `<p>Descripción: ${data[3].description}</p>`
    html += `<p>Tecnologias:`
    html += `<ul>`
    for (let i = 0; i < data[3].technologies.length; i++) {
        html += `<li>${data[3].technologies[i]}</li>`
    }
    html += `</ul>`
    html += `<p>Link al repositorio: <a href="${data[3].link}"><b>¡Aqui!</b></a></p>`
    html += `<div class="image"><img src="${data[3].img}" alt="${data[3].name}"></div>`

    return createPage('E Commerce', html)
}
function createSectionGame(data) {
    let html = `<nav><ul>
    <li><a href="mobile">mobile</a></li>
    <li><a href="landing">landing page</a></li>
    <li><a href="webapp">web app</a></li>
    <li><a href="ecommerce">e-commerce</a></li>
    <li><a href="game">games</a></li>
    </ul></nav>`
    html += `<h2>${data[4].name}</h2>`
    html += `<p>Descripción: ${data[4].description}</p>`
    html += `<p>Tecnologias:`
    html += `<ul>`
    for (let i = 0; i < data[4].technologies.length; i++) {
        html += `<li>${data[4].technologies[i]}</li>`
    }
    html += `</ul>`
    html += `<p>Link al repositorio: <a href="${data[4].link}"><b>¡Aqui!</b></a></p>`
    html += `<div class="image"><img src="${data[4].img}" alt="${data[4].name}"></div>`

    return createPage('Games', html)
}


export {
    createSectionMobilePage,
    createSectionLandingPage,
    createSectionWebApp,
    createSectionECommerce,
    createSectionGame,
    createPage,
}