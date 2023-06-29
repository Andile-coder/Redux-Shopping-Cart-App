import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        message: "Sending Request",
        type: "warning",
        open: true,
      })
    );
    const sendRequest = async () => {
      //Send state as sending data

      dispatch(
        uiActions.showNotification({
          message: "Sending Request",
          type: "warning",
          open: true,
        })
      );
      const response = await fetch(
        "https://redux-5238b-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      const data = await response.json();
      //send state as request is successful
      dispatch(
        uiActions.showNotification({
          message: "Sent Request successfully",
          type: "success",
          open: true,
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          message: "Sending Request Failed",
          type: "error",
          open: true,
        })
      );
    }
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const response = await fetch(
        "https://redux-5238b-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: "Fectching Request Failed",
          type: "error",
          open: true,
        })
      );
    }
  };
};
