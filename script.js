
const selectCurrentFrom = document.getElementById('select-current-from'),
	selectCurrentTo = document.getElementById('select-current-to'),
	currentFrom = document.getElementById('current-from'),
	currentTo = document.getElementById('current-to'),
	converting = document.getElementById('converting');

currentFrom.addEventListener('input', () => {
	currentFrom.value = currentFrom.value.replace(/\D+/, '');
});

converting.addEventListener('click', () => {
	const requestURL = `https://api.exchangeratesapi.io/latest?base=${selectCurrentFrom.value}`;

	const sendRequest = url => fetch(url).then(response => {
		if (!response.ok) {
			throw new Error('Что-то пошло не так');
		}
		return response.json();
	});


	sendRequest(requestURL)
		.then(data => {
			const current = selectCurrentTo.value;
			if (selectCurrentTo.value !== selectCurrentFrom.value) {
				currentTo.value = (currentFrom.value * data.rates[current]).toFixed(2);
			} else {
				currentTo.value = currentFrom.value;
			}
		})
		.catch(error => console.error(error));
});


