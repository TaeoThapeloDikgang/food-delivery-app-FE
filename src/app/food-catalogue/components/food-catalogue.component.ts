import { FoodItemService } from "./../service/fooditem.service";
import { FoodCataloguePage } from "./../../Shared/models/FoodCataloguePage";
import { FoodItem } from "./../../Shared/models/FoodItem";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-food-catalogue",
  templateUrl: "./food-catalogue.component.html",
  styleUrls: ["./food-catalogue.component.css"],
})
export class FoodCatalogueComponent {
  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FoodItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.restaurantId = +params.get("id");
    });

    this.getFoodItemsByRestaurant(this.restaurantId);
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.foodItemService
      .getFoodItemsByRestaurant(restaurant)
      .subscribe((data) => {
        this.foodItemResponse = data;
        console.log(this.foodItemResponse);

        this.foodItemResponse.foodItemList.forEach((item) => {
          this.foodItemCart.push(item); // Initialize quantity to 0 for each food item
        });
      });
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex((item) => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex((item) => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }
    }
  }

  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemList: [],
      restaurant: null,
    };
    this.orderSummary.foodItemList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    console.log(this.foodItemCart);
    // console.log(this.orderSummary);
    this.router.navigate(["/orderSummary"], {
      queryParams: { data: JSON.stringify(this.orderSummary) },
    });
  }
}
