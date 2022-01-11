import {useCallback,useState} from 'react'

/**
 * Returns a function that can be used to manually force re-render a component.
 */
export default function useForceUpdate(){
	const setState=useState({})[1]
	return useCallback(function forceUpdate(){ return setState({}) },[])
}