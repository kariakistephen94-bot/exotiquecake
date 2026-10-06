"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  Configuration,
  Product,
  defaultConfig,
  priceFor,
} from "@/data/products";
export type CartItem = {
  key: string;
  product: Product;
  config: Configuration;
  quantity: number;
  price: number;
};
type Store = {
  items: CartItem[];
  saved: string[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, c?: Configuration, q?: number) => void;
  remove: (k: string) => void;
  quantity: (k: string, q: number) => void;
  clear: () => void;
  edit: (k: string, c: Configuration) => void;
  toggleSave: (id: string) => void;
  subtotal: number;
  count: number;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("exotique-cart") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("exotique-saved") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      localStorage.setItem("exotique-cart", JSON.stringify(items));
      localStorage.setItem("exotique-saved", JSON.stringify(saved));
    }
  }, [items, saved, ready]);
  const add = (
    product: Product,
    config = { ...defaultConfig, flavour: product.flavour },
    quantity = 1,
  ) => {
    const key = product.id + JSON.stringify(config);
    setItems((old) =>
      old.some((i) => i.key === key)
        ? old.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
          )
        : [
            ...old,
            {
              key,
              product,
              config,
              quantity,
              price: priceFor(product, config),
            },
          ],
    );
    setOpen(true);
  };
  return (
    <Context.Provider
      value={{
        items,
        saved,
        open,
        setOpen,
        add,
        remove: (k) => setItems((v) => v.filter((i) => i.key !== k)),
        quantity: (k, q) =>
          setItems((v) =>
            v.map((i) =>
              i.key === k ? { ...i, quantity: Math.max(1, q) } : i,
            ),
          ),
        edit: (key, config) =>
          setItems((current) => {
            const item = current.find((i) => i.key === key);
            if (!item) return current;
            const newKey = item.product.id + JSON.stringify(config);
            const duplicate = current.find(
              (i) => i.key === newKey && i.key !== key,
            );
            return current
              .filter((i) => i.key !== key)
              .map((i) =>
                i.key === newKey
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              )
              .concat(
                duplicate
                  ? []
                  : [
                      {
                        ...item,
                        key: newKey,
                        config,
                        price: priceFor(item.product, config),
                      },
                    ],
              );
          }),
        clear: () => setItems([]),
        toggleSave: (id) =>
          setSaved((v) =>
            v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
          ),
        subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
        count: items.reduce((s, i) => s + i.quantity, 0),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  return useContext(Context)!;
}
