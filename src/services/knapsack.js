export function knapsack(maxCalories, valorNutricional, calories, selectedIngredients) {
  const n = valorNutricional.length;
  let dp = [];

  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= maxCalories; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (calories[i - 1] <= j) {
        dp[i][j] = Math.max(valorNutricional[i - 1] + dp[i - 1][j - calories[i - 1]], dp[i - 1][j]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  let i = n,
    j = maxCalories;
  let result = [];
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      result.push({
        valorNutricional: valorNutricional[i - 1],
        calories: calories[i - 1],
        selectedIngredients: selectedIngredients[i - 1].name,
      });
      j -= calories[i - 1];
    }
    i--;
  }

  return result;
}
