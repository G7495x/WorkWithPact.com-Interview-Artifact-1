declare global{
	interface Window{
		properOnLoadPromise:Promise<any>
	}
}

window.properOnLoadPromise=window.properOnLoadPromise ||
	Promise.all([
		new Promise((resolve)=>window.addEventListener('load',resolve)),
		document.fonts.ready,
	])

export default window.properOnLoadPromise
