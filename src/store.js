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
  discountType: "percentage",
  discountValue: 0,
  taxType: "percentage",
  taxValue: 0,
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

    if (store.discountType === "percentage") {
      const discountAmount = totalAmount * (store.discountValue / 100);
      adjustedTotal -= discountAmount;
    } else {
      adjustedTotal -= store.discountType === "fixed" ? store.discountValue : 0;
    }

    if (store.taxType === "percentage") {
      const taxAmount = totalAmount * (store.taxValue / 100);
      adjustedTotal -= taxAmount;
    } else {
      adjustedTotal -= store.taxType === "fixed" ? store.taxValue : 0;
    }

    adjustedTotal += parseFloat(store.shipping) || 0;
  },
  (state) => state.items
);
