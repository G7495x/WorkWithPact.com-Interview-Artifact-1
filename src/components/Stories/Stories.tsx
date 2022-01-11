import React from 'react'

import './Stories.scss'
import Scroll from '../../utils/components/Scroll/Scroll'
import stories from '../../data/stories'

export default function Stories(){
	return <div id="Stories">
		<h1 id="big-text" className="b900">
			&emsp;&emsp;&emsp;OCCASIONALLY, WE OFFER PERSPECTIVES ON THE DIRECT-TO-CONSUMER LANDSCAPE, RETAIL INNOVATIONS, HAPPENINGS AROUND PACT AND THE ODD CREATIVE EXPERIMENT.
		</h1>
		<Scroll>
			<div className="scroll-content-wrapper row f-nowrap f-center">
				<div className="vertical-text one-line" style={{padding: '0 140px'}}>LATEST STORIES</div>
				<div className="row f-nowrap gap-x-20 f-start ml-m20">
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
					{stories.map((story,i)=><Story {...{story}} key={i}/>)}
				</div>
			</div>
		</Scroll>
	</div>
}

export function Story({story}:any){
	return <div className="story-card">
		<img src={story.image} alt=""/>
		<div className="pt-40">CATEGORY</div>
		<h3 className="pt-16">{story.description}</h3>
	</div>
}