import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import { checkNumber } from "../utils/helpers";

const cart_reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = payload;
      console.log(
        "🚀TCL: ~ file: cart_reducer.js ~ line 13 ~ product",
        product
      );
      const tempItem = state.cart.find((item) => item.id === id + color);
      // existing item
      // update existing item
      if (tempItem) {
        // method 1
        // if (tempItem.amount !== amount) {
        //   tempItem.amount = amount;
        // }
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === tempItem.id) {
            // method 1
            // item = tempItem;
            //method 2
            //=checkNumber: method 1
            // let newAmount = cartItem.amount + amount;
            // if (newAmount > tempItem.max) {
            //   newAmount = tempItem.max;
            // }
            //=checkNumber: method 2
            let newAmount = checkNumber({
              value: cartItem.amount + amount,
              max: tempItem.max,
            });
            //= end checkNumb
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      }
      // new item
      // create new item
      else {
        const newItem = {
          id: id + color,
          name: product.name,
          image: product.images[0].url,
          color,
          amount,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
          // total_items: state.total_items + amount,
          // total_amount: state.total_amount + state.total_items * product.price,
        };
      }
    }
    default:
      throw new Error(`No Matching "${type}" - action type`);
  }
  // return state
};

export default cart_reducer;
