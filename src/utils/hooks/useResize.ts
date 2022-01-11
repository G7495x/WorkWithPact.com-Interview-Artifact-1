import globalAutoResizeObserver,{ResizeHandler} from '../dom/globalAutoResizeObserver'
import usePreEffect from './usePreEffect'
import useLifecycle from './useLifecycle'
import useUuid from './useUuid'
import useLocal from './useLocal'

// <div {...useResize(onResize)}>

// onResizeProps=useResize(onResize)
// <div {...onResizeProps}>
export default function useResize(onResize?:ResizeHandler,useDefaultResizeHandler:boolean=false){
	const resizeHandlerName=useUuid()
	usePreEffect(addResizeHandler,[onResize])
	useLifecycle({componentWillUnmount})
	return useLocal({'data-onresize': (useDefaultResizeHandler?'default ':'')+resizeHandlerName})

	function addResizeHandler(){ onResize && globalAutoResizeObserver.addHandler(resizeHandlerName,onResize,true) }
	function componentWillUnmount(){ globalAutoResizeObserver.removeHandler(resizeHandlerName) }
}