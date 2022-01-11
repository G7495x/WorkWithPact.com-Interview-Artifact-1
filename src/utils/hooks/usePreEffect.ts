import useLocal from './useLocal'

export type PreEffectCallback=(deps?: any[],prevDeps?: any[],changed?: any[])=>any

/**
 * Similar to `useEffect`, but executes before render.
 * `usePreEffect` helps you avoid `setState` in some non-async cases, hence reducing renders.
 * Avoid `setState` inside non-async `usePreEffect` as the component is already about to render, set `local.state=value` via `useLocal` instead.
 */
function usePreEffect(effect:PreEffectCallback,deps:any[]){
	const oldDeps=useLocal([])
	const prevDeps=[...oldDeps]
	const changed:any[]=[]

	let didChange=false
	for(let i in deps) (changed[i]=oldDeps[i]!==deps[i]) && (didChange=true) && (oldDeps[i]=deps[i])
	didChange && effect(deps,prevDeps,changed)
}

export default usePreEffect