const generateMessage = (user, text) => {
    // console.log(user)
    return{
        user: user.username  || 'Admin',
        id: user.id,
        createdAt: new Date().getTime(),
        text
    }
}

const generateLocation = (user, url) => {
    return{
        user: user.username,
        id: user.id,
        createdAt: new Date().getTime(),
        url
    }
}

module.exports = {
    generateMessage,
    generateLocation
}