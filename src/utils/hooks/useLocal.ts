import {useState} from 'react'
import AnyObject from '../ts/AnyObject'

export interface UseLocal{
	(initialState:any[]):any[]
	(initialState?:AnyObject):AnyObject
}

/**
 * Returns an object that retains value between renders.
 * Typically used to store state without causing render.
 * Similar to `this` pointer in class components.
 * Can return an array if initialState is an array.
 */
export default (function useLocal(initialState={}){ return useState(initialState)[0] } as UseLocal)