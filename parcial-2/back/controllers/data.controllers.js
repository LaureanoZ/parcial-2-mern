import * as service from '../services/web.services.js'
import * as view from '../views/web.views.js'


function getDataMobile(req, res) {
    service.getData()
        .then(function (data) {
            res.send(view.createSectionMobilePage(data))
        })
}
function getDataLanding(req, res) {
    service.getData()
        .then(function (data) {
            res.send(view.createSectionLandingPage(data))
        })
}
function getDataWebApp(req, res) {
    service.getData()
        .then(function (data) {
            res.send(view.createSectionWebApp(data))
        })
}
function getDataECommerce(req, res) {
    service.getData()
        .then(function (data) {
            res.send(view.createSectionECommerce(data))
        })
}
function getDataGame(req, res) {
    service.getData()
        .then(function (data) {
            res.send(view.createSectionGame(data))
        })
}
export {
    getDataMobile,
    getDataLanding,
    getDataWebApp,
    getDataECommerce,
    getDataGame,
}
