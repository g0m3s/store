import { Dispatch, SetStateAction } from "react";

export type CurrentScreenValues = 1 | 2

export interface SetCurrentScreen {
  setCurrentScreen: Dispatch<SetStateAction<CurrentScreenValues>>
}
