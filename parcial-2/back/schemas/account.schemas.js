import yup from 'yup'

const account = yup.object({
    userName: yup.string().trim().required().min(5),
    password: yup.string().required().min(5)
})

const profile = yup.object({
    name: yup.string().trim().required(),
    email: yup.string().trim().required().email(),
    avatar: yup.string().trim().required().url(),
    company: yup.string().trim().required(),
})

export {
    account,
    profile
}