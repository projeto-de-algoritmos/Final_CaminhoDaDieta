import React, { useState } from "react";
import UseDjikstra from "./useDjikstra";
import { knapsack } from "../services/knapsack";

const ingredients = [
  { name: "Arroz", value: 1, calories: 200 },
  { name: "Feijão", value: 2, calories: 300 },
  { name: "Carne", value: 3, calories: 400 },
  { name: "Salada", value: 2, calories: 100 },
  { name: "Batata", value: 1, calories: 150 },
  { name: "Ovo", value: 2, calories: 100 },
  { name: "Tomate", value: 1, calories: 50 },
];

const SeletorIngredientes = () => {
  const [maxCal, setMaxCal] = useState(100);
  const [result, setResult] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleMaxCalChange = (event) => {
    setMaxCal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedIngredients);
    setResult(
      knapsack(
        maxCal,
        selectedIngredients.map((ingredient) => {
          return ingredient.value;
        }),
        selectedIngredients.map((ingredient) => {
          return ingredient.calories;
        }),
        selectedIngredients
      )
    );
    setShowResult(true);
  };

  return (
    <div>
      <h1>Knapsack Problem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="maxCal">Max Cal:</label>
          <input type="number" id="maxCal" value={maxCal} onChange={handleMaxCalChange} />
        </div>
        <div>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={`ingredient.name - ${index}`}>
                {ingredient.name} ({ingredient.calories} calorias, R$
                {ingredient.value})
                <button type="button" onClick={() => handleSelectIngredient(ingredient)}>
                  Selecionar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {selectedIngredients.map((ingredient, index) => (
          <li key={`ingredient.name - ${index}`}>
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
      <div>
        <h2>Result:</h2>
        {result.map((item, index) => {
          return <p key={`${item}-${index}`}>{item.selectedIngredients}</p>;
        })}
      </div>

      {showResult && (
        <div>
          <UseDjikstra
            prop={result.map((ingredient) => {
              return ingredient.selectedIngredients;
            })}
          ></UseDjikstra>

          <button
            onClick={() => {
              setResult([]);
              setShowResult(false);
              setSelectedIngredients([]);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default SeletorIngredientes;
