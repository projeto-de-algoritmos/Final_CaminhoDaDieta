import React, { useState } from "react";
import UseDjikstra from "./useDjikstra";
import { knapsack } from "../services/knapsack";
import "./styles.css";

const ingredients = [
  { name: "Arroz", value: 1, calories: 200 },
  { name: "Feijão", value: 2, calories: 300 },
  { name: "Carne", value: 3, calories: 400 },
  { name: "Salada", value: 2, calories: 100 },
  { name: "Batata", value: 1, calories: 150 },
  { name: "Ovo", value: 2, calories: 100 },
  { name: "Tomate", value: 1, calories: 50 },
  { name: "Jiló", value: 3, calories: 200 },
  { name: "Abacate", value: 4, calories: 250 },
  { name: "Maçã", value: 2, calories: 150 },
];

const SeletorIngredientes = () => {
  const [maxCal, setMaxCal] = useState(100);
  const [result, setResult] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setShowResult(false);
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
    <div className="container">
      <div className="knapsack-background">
        <h1>Escolha o que voce quer comer</h1>
        <form onSubmit={handleSubmit} className="form-ingredients">
          <div>
            <label htmlFor="maxCal">Máximo de calorias:</label>
            <input type="number" id="maxCal" value={maxCal} onChange={handleMaxCalChange} />
          </div>
          <div className="table-ingredients">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Calorias</th>
                  <th>Valor Nutricional</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={`ingredient.name - ${index}`}>
                    <td>{ingredient.name}</td>
                    <td>{`${ingredient.calories} calorias`}</td>
                    <td>{ingredient.value}</td>
                    <td>
                      <button
                        type="button"
                        disabled={selectedIngredients.some((item) => item.name === ingredient.name)}
                        onClick={() => handleSelectIngredient(ingredient)}
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button disabled={showResult || selectedIngredients.length < 1} type="submit" style={{ width: "280px" }}>
            Escolher e ver o restaurante mais perto
          </button>
          <div className="table-ingredients">
            <table className="">
              <tbody>
                {selectedIngredients.map((ingredient, index) => (
                  <tr key={`ingredient.name - ${index}`}>
                    <td>{ingredient.name}</td>
                    <td>
                      <button
                        onClick={() => {
                          const newItems = [...selectedIngredients];
                          newItems.splice(index, 1);
                          setSelectedIngredients(newItems);
                        }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>

      <div className="graph-background">
        <h2>Resultado:</h2>
        <span>{`Com base no valor máximo de calorias de ${maxCal} calorias, você pode comer:`}</span>

        {result.map((item, index) => {
          return <p>{item.selectedIngredients}</p>;
        })}

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
              Limpar Resultado
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeletorIngredientes;
