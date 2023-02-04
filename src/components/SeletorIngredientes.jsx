import React, { useState } from "react";

const ingredients = [
  { name: "Arroz", value: 1, calories: 200 },
  { name: "Feijão", value: 2, calories: 300 },
  { name: "Carne", value: 3, calories: 400 },
  { name: "Salada", value: 2, calories: 100 },
];

const knapsack = (maxCalories, weights, values, n) => {
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(maxCalories + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= maxCalories; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let res = [];
  let w = maxCalories;
  for (let i = n; i > 0 && dp[i][w] > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      res.push(ingredients[i - 1]);
      w -= weights[i - 1];
    }
  }

  return res;
};

const SeletorIngredientes = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [maxCalories, setMaxCalories] = useState(500);

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const weights = ingredients.map((i) => i.calories);
  const values = ingredients.map((i) => i.value);

  const totalCalories = selectedIngredients.reduce((acc, ingredient) => acc + ingredient.calories, 0);

  const totalValue = selectedIngredients.reduce((acc, ingredient) => acc + ingredient.value, 0);

  return (
    <div>
      <h1>Seleção de ingredientes</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.name} ({ingredient.calories} calorias, R$
            {ingredient.value})<button onClick={() => handleSelectIngredient(ingredient)}>Selecionar</button>
          </li>
        ))}
      </ul>
      <div>
        <label>
          Calorias máximas:
          <input type="number" value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} />
        </label>
      </div>
      <div>
        <h2>Resultados</h2>
        <div>Total de calorias: {totalCalories}</div>
        <div>Valor total: R$ {totalValue}</div>
        <h3>Ingredientes selecionados:</h3>
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li key={ingredient.name}>
              <span>
                {ingredient.name} (R$ {ingredient.value})
              </span>
              <button
                onClick={() => {
                  const newItems = [...selectedIngredients];
                  newItems.splice(index, 1);
                  setSelectedIngredients(newItems);
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {totalCalories > maxCalories && <div>Atenção: você excedeu o limite de calorias!</div>}
      </div>
    </div>
  );
};

export default SeletorIngredientes;
