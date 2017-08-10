const uuid = require('uuid/v4');

let seats = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    seats.push({
      id: `${i}-${j}`,
      status: 'opened'
    });
  }
}

let users = 0;

const onBooking = (io, socket, data) => {
  seats = seats.map(s => {
    if (data.sids.indexOf(s.id) > -1) {
      return { id: s.id, status: 'closed' };
    } else {
      return s;
    }
  })
  return io.sockets.emit('seatChange', seats);
};

const onSelect = (io, socket, data) => {
  seats = seats.map(s => {
    if (s.id === data.sid) {
      return { id: s.id, status: 'select' };
    } else {
      return s;
    }
  })
  return io.sockets.emit('seatChange', seats);
};

const onDisconnect = (io, socket, data) => {
  users--;
  io.sockets.emit('userChange', users);
};

const addEventListeners = (io, socket) => {
  users++;

  socket.on('booking', data => onBooking(io, socket, data));
  socket.on('select', data => onSelect(io, socket, data));
  socket.on('disconnect', () => onDisconnect(io, socket));
  const d = {
    uid: uuid(),
    users: users,
    seats: seats
  };
  socket.emit('enter', d);
  io.sockets.emit('userChange', users);
};

module.exports.init = io => {
  io.on('connection', socket => addEventListeners(io, socket));
};
