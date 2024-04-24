// Function to set a cookie
function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// Function to get a cookie value by name
function getCookie(name) {
	var nameEQ = name + '=';
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1, cookie.length);
		}
		if (cookie.indexOf(nameEQ) == 0) {
			return cookie.substring(nameEQ.length, cookie.length);
		}
	}
	return null;
}

const checkFromCookies = () => {
	const currentPage = document.documentElement;

	let defaultColor = getCookie('defaultColor');
	let shadowColor1 = getCookie('shadowColor1');
	let shadowColor2 = getCookie('shadowColor2');
	currentPage.style.setProperty('--defaultColor', defaultColor);
	currentPage.style.setProperty('--shadowColor1', shadowColor1);
	currentPage.style.setProperty('--shadowColor2', shadowColor2);
	console.log('defaultColor', defaultColor);
	console.log('shadowColor1', shadowColor1);
	console.log('shadowColor2', shadowColor2);

	let status = getCookie('logged');
	console.log('logged', status);
	if (status == 'true') {
		// document.querySelector('.stocksElement').style.display = 'block';
		currentPage.style.setProperty('--loginStatus', `block`);
	} else {
		// 	document.querySelector('.stocksElement').style.display = 'none';
		currentPage.style.setProperty('--loginStatus', `none`);
	}
};

document.addEventListener('DOMContentLoaded', function () {
	checkFromCookies();
	const colorInput = document.querySelector('#inputColor');
	const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--defaultColor');
	colorInput.value = baseColor;

	// COLOR PICKER
	try {
		colorInput.addEventListener('input', (e) => {
			// make shortcut for html element
			const root = document.documentElement;
			// catch picked color
			let newColor = e.target.value;

			// substitute css variable with picked color
			root.style.setProperty('--defaultColor', `${newColor}`);

			// catch desired opacity from css
			let alpha1 = getComputedStyle(root).getPropertyValue('--shadowAlpha1');
			let alpha2 = getComputedStyle(root).getPropertyValue('--shadowAlpha2');
			// substitute css variable for shadows with picked opacity
			const setOpacity = (alpha) =>
				`${newColor}${Math.floor(alpha * 255)
					.toString(16)
					.padStart(2, 0)}`;
			// set new shadow colors
			root.style.setProperty('--shadowColor1', `${setOpacity(alpha1)}`);
			root.style.setProperty('--shadowColor2', `${setOpacity(alpha2)}`);
			setCookie('defaultColor', `${newColor}`, 1);
			setCookie('shadowColor1', `${setOpacity(alpha1)}`, 1);
			setCookie('shadowColor2', `${setOpacity(alpha2)}`, 1);
			checkFromCookies();
		});
	} catch (error) {}
});
