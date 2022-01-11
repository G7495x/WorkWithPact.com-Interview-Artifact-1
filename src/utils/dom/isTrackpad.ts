import {WheelEvent} from 'react'

export default function isTrackpad(e:WheelEvent<HTMLElement>){
	// @ts-expect-error TS2339: Property 'wheelDeltaY' does not exist on type 'WheelEvent '.
	return e.wheelDeltaY?e.wheelDeltaY===-3*e.deltaY:e.deltaMode===0
}