import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

// Function to retrieve cart items from localStorage
const getCartItemsFromLocalStorage = (): CartItem[] => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
};

// Initial state of the cart
const initialState: CartState = {
    items: getCartItemsFromLocalStorage(),
};

// Reducer function to update the cart state based on the action
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload }],
                };
            }
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        case 'CLEAR_CART':
            return { items: [] }; // Clears all items from the cart
        default:
            return state;
    }
};

// Cart context
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    updateQuantity: (id: string, quantity: number) => void;
}>({
    state: initialState,
    dispatch: () => null,
    updateQuantity: () => {},
});

// Cart context provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        console.log("Saved to localStorage:", state.items);
    }, [state.items]);

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    return (
        <CartContext.Provider value={{ state, dispatch, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};
