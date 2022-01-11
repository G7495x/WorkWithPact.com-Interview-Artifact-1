import React from 'react'
import {render} from 'react-dom'

import './styles.scss'
import App from './components/App/App'
import properOnLoadPromise from './utils/dom/properOnLoadPromise'

properOnLoadPromise.then(()=>document.body.classList.add('loaded'))
render(<App/>,document.getElementById('root'))
