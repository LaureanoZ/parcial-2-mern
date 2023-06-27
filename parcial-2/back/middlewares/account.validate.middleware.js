import * as accountSchemas from '../schemas/account.schemas.js'

async function validateAccount(req, res, next) {
    return accountSchemas.account.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((accaunt) => {
            res.body = accaunt
            next()
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

async function validateProfile(req, res, next) {
    return accountSchemas.profile.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((profile) => {
            res.body = profile
            next()
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

export {
    validateAccount,
    validateProfile
}