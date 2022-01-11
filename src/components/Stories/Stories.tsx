import React,{MutableRefObject,useEffect,useRef} from 'react'

import './Stories.scss'
import Scroll,{ScrollViewport,smoothScrollXTo} from '../../utils/components/Scroll/Scroll'
import stories from '../../data/stories'
import {useGesture} from '@use-gesture/react'

let ref:MutableRefObject<HTMLElement|undefined>
let scrollViewport:ScrollViewport
export default function Stories(){
	ref=useRef<HTMLElement>()
	useEffect(componentDidMount,[])

	return <div id="Stories">
		<h1 id="big-text" className="h3 md:h1 b900">
			&emsp;&emsp;&emsp;OCCASIONALLY, WE OFFER PERSPECTIVES ON THE DIRECT-TO-CONSUMER LANDSCAPE, RETAIL INNOVATIONS, HAPPENINGS AROUND PACT AND THE ODD CREATIVE EXPERIMENT.
		</h1>
		<Scroll className="scroll-x" {...{ref,onTouchStart,onTouchEnd}} {...useGesture({onDrag})()}>
			<div className="scroll-content-wrapper row f-nowrap f-center">
				<div className="vertical-text one-line">LATEST STORIES</div>
				<div className="row f-nowrap gap-x-20 f-start ml-m20 story-card-row">
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
				</div>
			</div>
		</Scroll>
	</div>

	function componentDidMount(){
		scrollViewport=ref.current?.children[0] as ScrollViewport
	}
}

function onDrag(e:any){
	// @ts-ignore
	!ref.current!.touch && smoothScrollXTo(scrollViewport,-e.delta[0],2.5)
}

function onTouchStart(e:any){ e.currentTarget.touch=true }
function onTouchEnd(e:any){ e.currentTarget.touch=false }

export function Story({story}:any){
	return <div className="story-card">
		<img src={story.image} alt=""/>
		<div className="pt-40">CATEGORY</div>
		<h3 className="pt-16 h5 md:h4 xl:h3 b300">{story.description}</h3>
	</div>
}