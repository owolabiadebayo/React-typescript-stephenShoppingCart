import { useState } from "react";
import { useQuery } from "react-query";
import Item from './item/item';
//Components
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
//styles
import { Wrapper, StyledButton } from "./App.styles";
import Cart from './Cart/Cart'


// Types
export interface CartItemType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  createdAt: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());


const App = () => {
  const [cartOpen, setCartOpen] = useState(false)

  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);
  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        ))
      }

      // first time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    }
    );
  }

  const handleRemoveFromCart = (id: number) => setCartItems(prev => {
    return prev.reduce((acc, item) => {
      if (item.id === id) {
        if (item.amount === 1)
          return acc;
        return [...acc, { ...item, amount: item.amount - 1 }];
      } else {
        return [...acc, item];
      }

    }, [] as CartItemType[]);
  });

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong</div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}> <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} /></Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'></Badge>
        <AddShoppingCartIcon />
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item => (<Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
