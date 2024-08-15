const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const {generateMessage, generateLocation} = require('./utils/message')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')
const app = express()

const server = http.createServer(app)
const io = socketio(server) // initializing a new instance of Socket.IO and binding it to the HTTP server created above

const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname,'../public')

app.use(express.static(publicDirectory))

io.on('connection', (socket) => { //here 'connection' is a built-in event
    console.log('New websocket connection(New Client connected to the Server)')
    // console.log(socket)
    socket.on('join', ({username, room}, callback) => {
        // console.log(socket.id, username, room)
        const {error, user} = addUser({id: socket.id, username, room})
        
        if(error){
            return callback(error)
        }

        socket.join(user.room)//join() can only be used on the server side

        socket.emit('message', generateMessage('Admin','Welcome!')) // here 'updatedCount' is a custom event; Note-the custom event name should be same on both the server and client side
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {room: user.room, usersInRoom: getUsersInRoom(user.room) })
    })

    const badWords = ['hell', 'ass', 'devil', 'curse']
    socket.on('sendMessage', (msg, callback) => {
        const user = getUser(socket.id)
        // console.log(user)
        if(badWords.includes(msg)){
            return callback('Profanity(use of bad words) is not allowed!')
        }
        io.to(user.room).emit('message', generateMessage(user, msg))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        // io.emit('message', `Location: ${coords.latitude},${coords.longitude}`)
        const user = getUser(socket.id)
        // console.log(user)
        io.to(user.room).emit('location', generateLocation(user.username, `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left the room!`))
            io.to(user.room).emit('roomData', {room: user.room, usersInRoom: getUsersInRoom(user.room) })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}!`)
})