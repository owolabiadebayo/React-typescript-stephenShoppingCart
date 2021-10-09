import Button from '@material-ui/core/Button'
// Type
import { CartItemType } from '../App'

import { Wrapper } from './item.styles'


interface Props {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({
    item, handleAddToCart
}) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
        </div>
        <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={() => handleAddToCart(item)}
        >
            Add to cart
        </Button>
    </Wrapper>
);

export default Item;