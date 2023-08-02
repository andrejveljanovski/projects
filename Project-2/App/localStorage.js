import { items } from "../Data/data.js";

export function updateItems() {
  localStorage.setItem("items", JSON.stringify(items));
}
