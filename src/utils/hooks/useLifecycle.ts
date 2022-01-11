import {useState,useEffect,EffectCallback} from 'react'


export type UseLifecycleParams={
	componentWillMount?:Function
	componentDidMount?:Function
	componentWillUnmount?:()=>void // React.Destructor
}

/**
 * Introduces lifecycle methods into the component.
 */
export default function useLifecycle({componentWillMount,componentDidMount,componentWillUnmount}:UseLifecycleParams){
	useState(componentWillMount)
	useEffect(function effect(){ // eslint-disable-line react-hooks/exhaustive-deps
		componentDidMount && componentDidMount()
		return componentWillUnmount
	} as EffectCallback,[])
}