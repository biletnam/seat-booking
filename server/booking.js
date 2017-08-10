const uuid = require('uuid/v4');

let seats = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    seats.push({
      id: `${i}-${j}`,
      lookingBy: [],
      bookingBy: ''
    });
  }
}

let users = 0;

const onBooking = (io, socket, data) => {
  seats = seats.map(seat => {
    if (data.sids.indexOf(seat.id) > -1) {
      return { id: seat.id, lookingBy: [], bookingBy: socket.id };
    } else {
      return seat;
    }
  })
  return io.sockets.emit('seats_changed', seats);
};

const onLooking = (io, socket, data) => {
  seats = seats.map(seat => {
    if (seat.id === data.sid) {
      seat.lookingBy.push(socket.id);
    }
    return seat;
  });
  return io.sockets.emit('seats_changed', seats);
};

const onUnLooking = (io, socket, data) => {
  seats = seats.map(seat => {
    if (seat.id === data.sid) {
      const idx = seat.lookingBy.indexOf(socket.id);
      seat.lookingBy.splice(idx, 1);
    }
    return seat;
  });
  return io.sockets.emit('seats_changed', seats);
};

const onDisconnect = (io, socket, data) => {
  users--;
  io.sockets.emit('users_changed', users);

  seats.forEach(seat => {
    const idx = seat.lookingBy.indexOf(socket.id);
    if (idx > -1) {
      seat.lookingBy.splice(idx, 1);
    }
  });
  io.sockets.emit('seats_changed', seats);
};

const addEventListeners = (io, socket) => {
  users++;

  socket.on('booking', data => onBooking(io, socket, data));
  socket.on('looking', data => onLooking(io, socket, data));
  socket.on('un_looking', data => onUnLooking(io, socket, data));
  socket.on('disconnect', () => onDisconnect(io, socket));
  const space = {
    uid: socket.id,
    users: users,
    seats: seats
  };
  socket.emit('join_in', space);
  io.sockets.emit('users_changed', users);
};

module.exports.init = io => {
  io.on('connection', socket => addEventListeners(io, socket));
};
