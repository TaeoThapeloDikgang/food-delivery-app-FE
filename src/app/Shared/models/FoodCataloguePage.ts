import { FoodItem } from "./FoodItem";
import { Restaurant } from "./Restaurant";

export interface FoodCataloguePage {
  foodItemList: FoodItem[];
  restaurant: Restaurant;
}
