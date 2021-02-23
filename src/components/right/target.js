import React from 'react'
import { DropTarget } from 'react-dnd'


/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const chessSquareTarget = {

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()
    const result = monitor.getDropResult();
    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    props.handlePick()
    return ({ moved: true, target_id: props.id })
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

class ChessSquare extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOver && this.props.isOver) {
      // You can use this as enter handler
    }

    if (prevProps.isOver && !this.props.isOver) {
      // You can use this as leave handler
    }

    if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  render() {
    // Your component receives its own props as usual
    const { position } = this.props

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props
    let borderColor = 'gray';
    if(isOver && canDrop){
        borderColor = 'green'
    }else if(!isOver && canDrop){
        borderColor = 'yellow'
    }else if(isOver && !canDrop){
        borderColor = 'red';
    }
    return connectDropTarget(
      <div className="item" style={{borderColor}}>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default DropTarget(
  'CARD',
  chessSquareTarget,
  collect
)(ChessSquare)