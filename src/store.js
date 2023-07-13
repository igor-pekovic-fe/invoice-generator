import { create } from "zustand";
import { nanoid } from "nanoid";

const calculateAmount = (rate, quantity) => rate * quantity;
const calculateTotal = (arr) =>
  arr.items.reduce((acc, item) => acc + item.rate * item.quantity, 0);

const date = new Date().toISOString().split("T")[0];

export const useStore = create((set, get) => ({
  number: 1,
  from: "",
  billTo: "",
  shipTo: "",
  date: date,
  paymentTerms: "",
  dueDate: date,
  poNum: "",
  notes: "",
  terms: "",
  currency: "$",
  subTotal: function () {
    return calculateTotal(get());
  },
  discountType: "percentage",
  discountValue: 0,
  taxType: "percentage",
  taxValue: 0,
  shipping: 0,
  total: 0,
  amountPaid: 0,
  balanceDue: 0,
  items: [
    {
      description: "",
      rate: 0,
      quantity: 0,
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
    const totalAmount = calculateTotal(state);

    let adjustedTotal = totalAmount;

    const discountAmount =
      state.discountType === "percentage"
        ? totalAmount * (state.discountValue / 100)
        : state.discountType === "fixed"
        ? state.discountValue
        : 0;

    const taxAmount =
      state.taxType === "percentage"
        ? totalAmount * (state.taxValue / 100)
        : state.taxType === "fixed"
        ? state.taxValue
        : 0;

    adjustedTotal -= discountAmount;
    adjustedTotal -= taxAmount;
    adjustedTotal += parseFloat(state.shipping) || 0;

    state.total = adjustedTotal;
    state.balanceDue = adjustedTotal - state.amountPaid;
  },
  (state) => state.items
);
