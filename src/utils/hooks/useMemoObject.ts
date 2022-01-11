import useLocal from './useLocal'

// TODO-FUTURE: Comparator function

/**
 * Returns a memoized object if passed object has same values from previous render (shallow compare).
 * Especially useful while sending props object to pure / memoized components.
 */
export default function useMemoObject<Type extends Object>(obj:Type){
	const oldObj=useLocal() as Type
	const newObj=useLocal() as Type

	let changed=false
	for(let i in obj){
		newObj[i]=obj[i]
		oldObj[i]!==obj[i] && (changed=true) && (oldObj[i]=obj[i])
	}
	return changed?{...newObj}:newObj
}