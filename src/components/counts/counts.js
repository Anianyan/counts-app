import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShoppingCart,
    faRecycle,
    faUndoAlt,
    faPlusCircle,
    faMinusCircle,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

function Counts() {
    let [activeItemsCount, setActiveItemsCount] = useState(0);
    const [items, setItems] = useState(new Array(5).fill(0));

    const handleActionClick = (evt, index) => {
        if (evt.currentTarget.id === "increase") {
            activeItemsCount++;
            items[index] += 1;
        } else {
            activeItemsCount--;
            items[index] -= 1;
        }

        setActiveItemsCount(activeItemsCount);
        setItems(items);
    }

    const handleDeleteItem = (index) => {
        if (index >= 0 && index < items.length) {
            activeItemsCount -= items[index];

            setActiveItemsCount(activeItemsCount);
            setItems(items.filter((item, i) => index !== i));
        }
    }

    const handleRefreshNumbers = () => {
        setActiveItemsCount(0);
        setItems(items.map(() => 0));
    }

    const handleRestoreItems = () => {
        setActiveItemsCount(0);
        setItems(new Array(5).fill(0));
    }

    return (
        <div className="counts-wrapper">
            <div className="counts-item-wrapper">
                <div className="row_1">
                    <FontAwesomeIcon icon={ faShoppingCart }/> { activeItemsCount } Items
                </div>
                
                <div className="row_2">
                    <button onClick={handleRefreshNumbers}>Refresh numbers<FontAwesomeIcon icon={ faUndoAlt }/></button>
                    <button disabled={items.length !== 0} onClick={handleRestoreItems}>Restore <FontAwesomeIcon icon={ faRecycle }/></button>
                </div>

                <div className="row_3">
                    {items.map((count, index) => (
                        <div key={ index } className="counts-item">
                            { count }
                            <button id="increase" type="button" onClick={(evt) => handleActionClick(evt, index)}>
                                <FontAwesomeIcon icon={ faPlusCircle }/>
                            </button>
                            <button id="decrease" type="button" onClick={(evt) => handleActionClick(evt, index)} disabled={count === 0}>
                                <FontAwesomeIcon icon={ faMinusCircle }/>
                            </button>
                            <button type="button" onClick={() => handleDeleteItem(index)}>
                                <FontAwesomeIcon icon={ faTrash }/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Counts;
