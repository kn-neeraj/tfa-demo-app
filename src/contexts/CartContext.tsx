import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  rating?: any;
}

interface CartState {
  items: CartItem[];
}

interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  decrementFromCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'DECREMENT'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + (action.item.quantity || 1) } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: action.item.quantity || 1 }],
      };
    }
    case 'DECREMENT': {
      return {
        items: state.items
          .map(i => i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i)
          .filter(i => i.quantity > 0),
      };
    }
    case 'REMOVE': {
      return {
        items: state.items.filter(i => i.id !== action.id),
      };
    }
    case 'CLEAR': {
      return { items: [] };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const getInitialCart = () => {
    try {
      const stored = localStorage.getItem('cart-items');
      if (stored) return JSON.parse(stored);
    } catch { /* empty */ }
    return { items: [] };
  };
  const [cart, dispatch] = useReducer(cartReducer, getInitialCart());

  React.useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    dispatch({ type: 'ADD', item: { ...item, quantity } });
  };
  const decrementFromCart = (id: number) => {
    dispatch({ type: 'DECREMENT', id });
  };
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE', id });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decrementFromCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
