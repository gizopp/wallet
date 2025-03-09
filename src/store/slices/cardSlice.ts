import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  cardNumber: string;
  cardHolder: string;
  validity: string;
  cvv: string;
  showAnimation: boolean;
  formVisible: boolean;
}

const initialState: CardState = {
  cardNumber: "",
  cardHolder: "",
  validity: "",
  cvv: "",
  showAnimation: false,
  formVisible: true,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.cardNumber = action.payload;
    },
    setCardHolder: (state, action: PayloadAction<string>) => {
      state.cardHolder = action.payload;
    },
    setValidity: (state, action: PayloadAction<string>) => {
      state.validity = action.payload;
    },
    setCvv: (state, action: PayloadAction<string>) => {
      state.cvv = action.payload;
    },
    setShowAnimation: (state, action: PayloadAction<boolean>) => {
      state.showAnimation = action.payload;
    },
    setFormVisible: (state, action: PayloadAction<boolean>) => {
      state.formVisible = action.payload;
    },
    resetCardForm: (state) => {
      return initialState;
    },
    handleAdvance: (state) => {
      state.formVisible = false;
      state.showAnimation = true;
    },
  },
});

export const {
  setCardNumber,
  setCardHolder,
  setValidity,
  setCvv,
  setShowAnimation,
  setFormVisible,
  resetCardForm,
  handleAdvance,
} = cardSlice.actions;

export default cardSlice.reducer;
