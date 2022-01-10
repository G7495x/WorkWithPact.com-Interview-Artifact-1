import {render} from 'react-dom'

import './styles.scss'
import App from './components/App/App'
import properOnLoadPromise from './utils/dom/properOnLoadPromise'

document.head.innerHTML += `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/supergrids.css@1.0.0-beta.8/src/css/build/SuperGrids.min.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:wght@100;200;300;400;500;600;700;800;900&display=swap" />
<style>
#spinner {
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 30px;
  height: 30px;
  transition: opacity 1s, visibility 1s;
}
body.loaded > #spinner {
  opacity: 0;
  visibility: hidden;
}
</style>
`

// TODO: Add #spinner

properOnLoadPromise.then(() => document.body.classList.add('loaded'))

render(<App />, document.getElementById('root'))
