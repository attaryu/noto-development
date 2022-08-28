export default function notif(message) {
	const popUpText = document.querySelector(".pop-up-notif__text");
	const popUp = popUpText.parentNode;

	popUpText.innerText = message;
	popUp.classList.add("pop-up-notif--direction");

	setTimeout(() => {
		popUp.classList.remove("pop-up-notif--direction");
	}, 2000);
}
