
const { mongoose } = require('../server/db/mongoose');

const { Todo } = require('../server/models/todo');

// Todo.remove({})
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// Todo.findByIdAndRemove({ _id: '5ca02cbe43b0a610babd87be'})
//     .then( data => console.log(data))
//     .catch(err => console.log(err));

Todo.findByIdAndRemove('5ca02c5c43b0a610babd87bd')
    .then(data => console.log(data))
    .catch(err => console.log(err));