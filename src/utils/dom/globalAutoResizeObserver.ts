import properOnLoadPromise from './properOnLoadPromise'

// TODO: listeners and dispatchEvents

// 1. <div data-onresize="handlerName">
// 2. globalAutoResizeObserver.addHandler('handlerName',e=>console.log('onresize event'))

// Typescript Types -----------------------------------------------------------

export type ResizeHandler=(entry:ResizeObserverEntry)=>any

export interface GlobalAutoResizeObserver extends ResizeObserver{
	handlers: { [resizeHandlerName:string]: ResizeHandler } // Mutable object
	addHandler: (resizeHandlerName:string,resizeHandler:ResizeHandler,overwrite?:boolean)=>any
	removeHandler: (resizeHandlerName:string)=>any
	mutationObserver: MutationObserver // Watches DOM for elements with `data-onresize` attribute to auto observe / unobserve
	trigger: (target:HTMLElement)=>void
	windowOnResize: ()=>void
}

declare global{
	interface Window{
		globalAutoResizeObserver: GlobalAutoResizeObserver
	}
}


// Main -----------------------------------------------------------------------

if(!window.globalAutoResizeObserver){ // To prevent multiple initializations

	// Global ResizeObserver. Runs the ResizeHandlers from 'data-onresize' attribute (space separated).
	window.globalAutoResizeObserver=new ResizeObserver(entries=>{
		for(let entry of entries)
			// (entry.target as HTMLElement).dataset['onresize']?.split(/ +/)
			// 	.forEach(resizeHandlerName=>window.globalAutoResizeObserver.handlers[resizeHandlerName]?.(entry))
			[...new Set( // removing duplicates
				(entry.target as HTMLElement).dataset['onresize']?.split(/ +/)
			)].forEach(resizeHandlerName=>window.globalAutoResizeObserver.handlers[resizeHandlerName]?.(entry))
	}) as GlobalAutoResizeObserver

	// Maintains a map of tags:string -> ResizeHandlers. So a ResizeHandler can be accessed via tag.
	window.globalAutoResizeObserver.handlers={}

	// Add a ResizeHandler.
	// Equivalent to adding keys manually. `window.globalAutoResizeObserver.handlers[resizeHandlerName]=resizeHandler`
	window.globalAutoResizeObserver.addHandler=
		((resizeHandlerName,resizeHandler,overwrite=false)=>{
			if(!overwrite && window.globalAutoResizeObserver.handlers[resizeHandlerName])
				throw new Error(`ResizeHandler with name: '${resizeHandlerName}' already exists. To overwrite, set overwrite flag.`)
			window.globalAutoResizeObserver.handlers[resizeHandlerName]=resizeHandler
		})

	// Remove a ResizeHandler.
	// Equivalent to removing keys manually. `delete window.globalAutoResizeObserver.handlers[resizeHandlerName]`
	window.globalAutoResizeObserver.removeHandler=
		(resizeHandlerName=>delete window.globalAutoResizeObserver.handlers[resizeHandlerName])

	// Manually trigger onresize on an HTMLElement
	window.globalAutoResizeObserver.trigger=
		(target=>{ window.globalAutoResizeObserver.unobserve(target);window.globalAutoResizeObserver.observe(target) })

	// Watches DOM for elements with `data-onresize` attribute to auto observe / unobserve
	window.globalAutoResizeObserver.mutationObserver=new MutationObserver(mutationRecords=>{
		for(let mutationRecord of mutationRecords){
			for(let addedNode of mutationRecord.addedNodes){
				if(!(addedNode as Element).querySelectorAll) continue
				const newNodes=(addedNode as Element).querySelectorAll('[data-onresize]')
				for(let newNode of newNodes) window.globalAutoResizeObserver.observe(newNode)
			}

			for(let removedNode of mutationRecord.removedNodes){
				if(!(removedNode as Element).querySelectorAll) continue
				const deletedNodes=(removedNode as Element).querySelectorAll('[data-onresize]')
				for(let deletedNode of deletedNodes) window.globalAutoResizeObserver.unobserve(deletedNode)
			}

			// Mutated Nodes
			if(mutationRecord.type==='attributes'){
				const target=mutationRecord.target as HTMLElement
				window.globalAutoResizeObserver.unobserve(target)
				target.dataset.onresize!==undefined && window.globalAutoResizeObserver.observe(target)
			}
		}
	})
	window.globalAutoResizeObserver.mutationObserver.observe(document.body,{
		attributes: true,
		attributeFilter: ['data-onresize'],
		attributeOldValue: true,
		subtree: true,
		childList: true,
	})

	window.globalAutoResizeObserver.addHandler('default',defaultResizeHandler)

	window.globalAutoResizeObserver.windowOnResize=windowOnResize
	window.addEventListener('resize',windowOnResize)
	windowOnResize()
}

export function defaultResizeHandler(entry:ResizeObserverEntry){
	const target=entry.target as HTMLElement
	const {style}=target
	style.setProperty('--contentWidth',String(entry.contentRect.width))
	style.setProperty('--contentHeight',String(entry.contentRect.height))
	style.setProperty('--clientWidth',String(target.clientWidth))
	style.setProperty('--clientHeight',String(target.clientHeight))
	style.setProperty('--offsetWidth',String(target.offsetWidth))
	style.setProperty('--offsetHeight',String(target.offsetHeight))
}

export function windowOnResize(){
	const {style}=document.documentElement
	style.setProperty('--innerWidth',String(window.innerWidth))
	style.setProperty('--innerHeight',String(window.innerHeight))
	style.setProperty('--outerWidth',String(window.outerWidth))
	style.setProperty('--outerHeight',String(window.outerHeight))
	style.setProperty('--pixelRatio',String(window.devicePixelRatio))
}

// Onload trigger -------------------------------------------------------------

properOnLoadPromise.then(()=>{
	for(let e of document.body.querySelectorAll('[data-onresize]'))
		window.globalAutoResizeObserver.trigger(e as HTMLElement)
})

// Exports --------------------------------------------------------------------

export default window.globalAutoResizeObserver
