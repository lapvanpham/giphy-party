const API_KEY = 'Dqjx9dzhf6OPn6V8QJZW86BDlwM7alZq';
const url = 'https://api.giphy.com/v1/gifs/search';
const input = document.querySelector('#input');
const submitBtn = document.querySelector('#submit-btn');
const removeBtn = document.querySelector('#remove-btn');
const resultsEl = document.getElementById('results');

let searchingKeyword = '';
const gifs = [];

function handleRemove(e) {
	e.preventDefault()
	gifs.pop();
	renderGifs();
}

function handleChange() {
	searchingKeyword = input.value;
}

function renderGifs() {
	resultsEl.innerHTML = '';
	gifs.forEach((gif) => {
		const img = document.createElement('img');
		img.src = gif;
		resultsEl.appendChild(img);
	});
}

function handleSubmit(e) {
	e.preventDefault();
	input.value = ''
	axios
		.get(url, {
			params: {
				q: searchingKeyword,
				api_key: API_KEY,
			},
		})
		.then((response) => {
			const gif = response.data.data[0].images.original.url;
			console.log(gif);
			gifs.push(gif);
			renderGifs();
		});
}

input.addEventListener('change', handleChange);
submitBtn.addEventListener('click', handleSubmit);
removeBtn.addEventListener('click', handleRemove);
