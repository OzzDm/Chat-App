const socket = io()

//server (emit) -> client(receive) --acknowledgement -> server
//client (emit) -> server(receive) --acknowledgement -> client

//Elements
const messageForm = document.querySelector('#message-form')
const formInput = messageForm.querySelector('input')
const formButton = messageForm.querySelector('button')
const locationButton = document.querySelector('#send-location')
const messages = document.querySelector('#messages')
const locationLink = document.querySelector('#location-link')

//Template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

const autoscroll = () => {
    //New message Element
    const newMessage = messages.lastElementChild

    //Height of the new message
    const newMessageStyles = getComputedStyle(newMessage)  // console.log(newMessageStyles)    
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)    // console.log(newMessageMargin)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    //Visible Height
    const visibleHeight = messages.offsetHeight

    //Container Height - height of the messages container
    const containerHeight = messages.scrollHeight

    //How far have I scrolled?
    const scrollOffset = messages.scrollTop + visibleHeight

    if(Math.round(containerHeight - newMessageHeight) <= Math.round(scrollOffset)){
        messages.scrollTop = messages.scrollHeight
    }


}

socket.on('message', (msg) => {
    // console.log(msg)
    const isSent = msg.id === socket.id
    // console.log(socket.id)
    const html = Mustache.render(messageTemplate, {
        username: msg.user,
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a'),
        isSent
    })
    messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('location', (message) => {
    // console.log(message)
    const isSent = msg.id === socket.id
    const html = Mustache.render(locationTemplate, {
        username: message.user,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a'),
        isSent
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.emit('join', {username, room}, (acknowledgement) => {
    // console.log(acknowledgement)
    if(acknowledgement){
        alert(acknowledgement)
        location.href = '/'
    }
})

socket.on('roomData', ({room, usersInRoom}) => {
    // console.log(room, usersInRoom)
    const html = Mustache.render(sidebarTemplate, {
        room,
        users: usersInRoom
    })
    document.querySelector('#sidebar').innerHTML = html
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    formButton.setAttribute('disabled', 'disabled')

    const message = e.target.message.value

    socket.emit('sendMessage', message, (acknowledgement) => {
        formButton.removeAttribute('disabled')
        formInput.value = ''
        formInput.focus()
        // console.log(acknowledgement)
    })
})

locationButton.addEventListener('click', (e) => {    
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!')
    }

    locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        socket.emit('sendLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude}, 
            (acknowledgement) => {
                locationButton.removeAttribute('disabled')
                // console.log(acknowledgement)
            }
        )
    })
})


