import useLocal from './useLocal'

// TODO-FUTURE: Comparator function

/**
 * Returns a memoized array if passed array has same values from previous render (shallow compare).
 */
export default function useMemoArray<Type extends any[]>(array:Type){
	const oldArray=useLocal([]) as Type
	const newArray=useLocal([]) as Type
	
	let changed=false
	for(let i in array){
		newArray[i]=array[i]
		oldArray[i]!==array[i] && (changed=true) && (oldArray[i]=array[i])
	}
	return changed?(newArray.slice() as Type):newArray
}