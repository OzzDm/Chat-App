const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room}) => {
    //clean the data - samitize and validate
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room){
        return {
            error: 'Username and room are required!'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    if(existingUser){
        return {
            error: 'Username already exists!'
        }
    }

    //Store user
    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    // console.log(index)
    if(index !== -1){
        return users.splice(index,1)[0] //the element to be removed
    }
}

const getUser = (id) => { 
    return users.find((user) => user.id === id) 
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room.toLowerCase())
    
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}