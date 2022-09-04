const KEY = "KEY_NOTE";

export function store(item) {
	localStorage.setItem(KEY, JSON.stringify(item));
}

export function getItem() {
	return JSON.parse(localStorage.getItem(KEY));
}
