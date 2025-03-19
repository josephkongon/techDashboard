import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

import { LocalStorageService } from "@/service/localStorage.service";

import { AppTheme } from "@/types/ui.ts";
import { getUserTheme } from "@/helpers/theme.ts";

const theme = getUserTheme();
// updateBodyTheme(theme);

const initialState = {
  theme: "Light" as AppTheme,
  modals: {
    brandSelector: {
      visible: false,
      data: null as null,
    },
  },
};

type ModalNames = keyof typeof initialState.modals;
type ModalData<T extends ModalNames> = (typeof initialState.modals)[T]["data"];

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (ui) => {
      ui.theme = ui.theme === "Light" ? "Dark" : "Light";

      LocalStorageService.set("theme", ui.theme);

      updateBodyTheme(ui.theme);
    },
    openModal: <T extends ModalNames>(
      ui: Draft<typeof initialState>,
      { payload }: PayloadAction<{ name: T; data?: ModalData<T> } | T>,
    ) => {
      if (typeof payload === "string") {
        ui.modals[payload].visible = true;
        ui.modals[payload].data = null;
      } else {
        ui.modals[payload.name].visible = true;
        ui.modals[payload.name].data = payload.data || null;
      }
    },
    closeModal: (ui, { payload }: PayloadAction<ModalNames>) => {
      ui.modals[payload].visible = false;
      ui.modals[payload].data = null;
    },
  },
});

export const uiActions = slice.actions;

export default slice.reducer;

function updateBodyTheme(theme: AppTheme) {
  document.body.classList.remove("Light", "Dark");
  document.body.classList.add(theme);
}
