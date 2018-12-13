const axios = require('axios');

axios.delete('http://localhost:3000/authentication/', {
	username: 'sebi',
	token: '1111'
}).then((response) => {
	console.log('ok');
	console.log(response)
}).catch((error) => {
	console.log(error)
})

console.log('hello');