import { create } from "zustand";
import { nanoid } from "nanoid";

const calculateAmount = (rate, quantity) => rate * quantity;

export const useStore = create((set) => ({
  number: 1,
  from: "",
  billTo: "",
  shipTo: "",
  notes: "",
  terms: "",
  currency: "$",
  subTotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  items: [
    {
      description: "",
      rate: 5,
      quantity: 2,
      id: nanoid(),
      amount: function () {
        return calculateAmount(this.rate, this.quantity);
      },
    },
  ],
  setValue: (value, key) => set(() => ({ [key]: value })),
  addItem: (newItem) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...newItem,
          amount: function () {
            return calculateAmount(this.rate, this.quantity);
          },
        },
      ],
    })),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedItem };
        }
        return item;
      }),
    })),
}));

useStore.subscribe(
  (store) => {
    const totalAmount = store.items.reduce(
      (acc, item) => acc + calculateAmount(item.rate, item.quantity),
      0
    );
    store.subTotal = totalAmount;

    let adjustedTotal = totalAmount;

    if (store.discount) {
      adjustedTotal -= totalAmount * (store.discount / 100);
    }
    if (store.tax) {
      adjustedTotal -= totalAmount * (store.tax / 100);
    }
    if (parseFloat(store.shipping)) {
      adjustedTotal += parseFloat(store.shipping);
    }

    store.total = adjustedTotal;
  },
  (state) => state.items
);
