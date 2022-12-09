import { Dispatch, SetStateAction } from "react";

export type CurrentScreenValues = 1 | 2 | 3

export interface SetCurrentScreen {
  setCurrentScreen: Dispatch<SetStateAction<CurrentScreenValues>>
}
