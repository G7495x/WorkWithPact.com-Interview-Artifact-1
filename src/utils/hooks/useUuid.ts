import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'

/**
 * Gives a constant UUID.
 */
export default function useUuid(){ return useState(uuidv4)[0] }
