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
  (state) => {
    const totalAmount = state.items.reduce(
      (acc, item) => acc + item.rate * item.quantity,
      0
    );

    let adjustedTotal = totalAmount;

    if (state.discountType === "percentage") {
      const discountAmount = totalAmount * (state.discountValue / 100);
      adjustedTotal -= discountAmount;
    } else if (state.discountType === "fixed") {
      adjustedTotal -= state.discountValue;
    }

    if (state.taxType === "percentage") {
      const taxAmount = totalAmount * (state.taxValue / 100);
      adjustedTotal -= taxAmount;
    } else if (state.taxType === "fixed") {
      adjustedTotal -= state.taxValue;
    }

    adjustedTotal += parseFloat(state.shipping) || 0;

    set({
      subTotal: totalAmount,
      total: adjustedTotal,
    });
  },
  (state) => state.items
);
