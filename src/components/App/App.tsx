import React from 'react'

import './App.scss'
import Scroll from '../../utils/components/Scroll/Scroll'
import Stories from '../Stories/Stories'
import StartProject from '../StartProject/StartProject'

export default function App(){
	return (
		<Scroll id="App" className="scroll-y smooth-wheel">
			<div className="scroll-content-wrapper col-12">
				<Stories/>
				<StartProject/>
			</div>
		</Scroll>
	)
}
