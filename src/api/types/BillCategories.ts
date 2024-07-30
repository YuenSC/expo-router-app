export enum BillCategoryEnum {
  Transportation = "Transportation",
  Accommodation = "Accommodation",
  FoodAndDining = "FoodAndDining",
  SightseeingAndActivities = "SightseeingAndActivities",
  Entertainment = "Entertainment",
  Shopping = "Shopping",
  Insurance = "Insurance",
  Miscellaneous = "Miscellaneous",
}

// Generate color for each category
export const BillCategoryColor = {
  [BillCategoryEnum.Transportation]: "#FFC107",
  [BillCategoryEnum.Accommodation]: "#FF5722",
  [BillCategoryEnum.FoodAndDining]: "#4CAF50",
  [BillCategoryEnum.SightseeingAndActivities]: "#2196F3",
  [BillCategoryEnum.Entertainment]: "#9C27B0",
  [BillCategoryEnum.Shopping]: "#FF9800",
  [BillCategoryEnum.Insurance]: "#795548",
  [BillCategoryEnum.Miscellaneous]: "#607D8B",
};
