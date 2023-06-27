function createPage(title, content) {
    let html;

    html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    html += '<link rel="stylesheet" href="/css/styles.css">'
    html += '<title>' + title + '</title></head><body>'

    html += `<h1>${title}</h1>`
    html += `<main>${content}</main>`
    html += '</body> </html>'

    return html
}

export {
    createPage,
}
