import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  cardNumber: string;
  cardHolder: string;
  validity: string;
  cvv: string;
  backgroundColor: string;
  textColor: string;
  cardType: string;
  showAnimation: boolean;
  formVisible: boolean;
}

const initialState: CardState = {
  cardNumber: "",
  cardHolder: "",
  validity: "",
  cvv: "",
  backgroundColor: "",
  textColor: "",
  cardType: "",
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
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.textColor = action.payload;
    },
    setCardType: (state, action: PayloadAction<string>) => {
      state.cardType = action.payload;
    },
    setShowAnimation: (state, action: PayloadAction<boolean>) => {
      state.showAnimation = action.payload;
    },
    setFormVisible: (state, action: PayloadAction<boolean>) => {
      state.formVisible = action.payload;
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
  setBackgroundColor,
  setTextColor,
  setCardType,
  setShowAnimation,
  setFormVisible,
  handleAdvance,
} = cardSlice.actions;

export default cardSlice.reducer;
