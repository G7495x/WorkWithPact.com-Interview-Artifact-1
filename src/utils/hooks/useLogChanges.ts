import useLocal from './useLocal'
import AnyObject from '../ts/AnyObject'

/**
 * `useLogChanges` prints changes in deps.
 * eg: `useLogChanges({dep1,dep2,dep3})`.
 * eg: `useLogChanges([dep1,dep2,dep3])`.
 * eg: `useLogChanges(myObject)`.
 * eg: `useLogChanges(myArray)`.
 */
export default function useLogChanges<Type extends AnyObject|any[]>(deps:Type){
	const isArray=Array.isArray(deps)
	const oldDeps=useLocal(isArray?[]:{}) as Type

	const changedIndexes=[]
	const oldVals=[]
	const newVals=[]
	for(let i in deps)
		if(oldDeps[i]!==deps[i]){ // eslint-disable-line no-cond-assign
			changedIndexes.push(i)
			oldVals.push(oldDeps[i])
			newVals.push(deps[i])
			oldDeps[i]=deps[i]
		}
	if(changedIndexes.length) console.log(`useLogChanges: Changed`,changedIndexes,oldVals,newVals)
}