import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  securityCode: string;
  showAnimation: boolean;
  formVisible: boolean;
}

const initialState: CardState = {
  cardNumber: "",
  cardholderName: "",
  expiryDate: "",
  securityCode: "",
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
    setCardholderName: (state, action: PayloadAction<string>) => {
      state.cardholderName = action.payload;
    },
    setExpiryDate: (state, action: PayloadAction<string>) => {
      state.expiryDate = action.payload;
    },
    setSecurityCode: (state, action: PayloadAction<string>) => {
      state.securityCode = action.payload;
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
  setCardholderName,
  setExpiryDate,
  setSecurityCode,
  setShowAnimation,
  setFormVisible,
  resetCardForm,
  handleAdvance,
} = cardSlice.actions;

export default cardSlice.reducer;
