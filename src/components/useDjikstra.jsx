import React from "react";
import { useState, useEffect } from "react";

const nodes = ["CASA", "A", "B", "C", "D", "E"];
const edges = [
  { from: "CASA", to: "A", weight: 10 },
  { from: "A", to: "B", weight: 10 },
  { from: "A", to: "C", weight: 20 },
  { from: "B", to: "D", weight: 15 },
  { from: "C", to: "E", weight: 30 },
];
const startNode = "CASA";
const ingredients = {
  CASA: [""],
  A: ["Arroz", "Feijão", "Carne"],
  B: ["Arroz", "Feijão", "Carne", "Salada"],
  C: ["Arroz", "Feijão", "Carne", "Salada", "Batata"],
  D: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo"],
  E: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo", "Tomate"],
};

const UseDjikstra = (prop) => {
  const [shortestPath, setShortestPath] = useState({});
  const [result, setResult] = useState(false);
  const [resultIngredients] = useState(prop);

  const compareIngredients = (resultIngredients, ingredients) => {
    console.log("resultIngredients", resultIngredients);
    let count = 0;
    resultIngredients.prop.forEach((ingredient) => {
      if (ingredients.includes(ingredient)) {
        count++;
      }
    });
    return count;
  };

  useEffect(() => {
    const distances = {};
    const previousNodes = {};
    const unvisitedNodes = new Set(nodes);

    nodes.forEach((node) => {
      distances[node] = Number.MAX_SAFE_INTEGER;
      previousNodes[node] = null;
    });

    distances[startNode] = 0;

    while (unvisitedNodes.size > 0) {
      let currentNode = null;
      let currentNodeShortestDistance = Number.MAX_SAFE_INTEGER;

      unvisitedNodes.forEach((node) => {
        if (distances[node] < currentNodeShortestDistance) {
          currentNodeShortestDistance = distances[node];

          currentNode = node;
        }
      });

      unvisitedNodes.delete(currentNode);

      edges
        .filter((edge) => edge.from === currentNode)
        .forEach((edge) => {
          const distance = distances[currentNode] + edge.weight;

          if (distance < distances[edge.to]) {
            distances[edge.to] = distance;
            previousNodes[edge.to] = currentNode;
          }
        });
    }

    let restaurant = null;
    let maxIngredients = 0;

    nodes.forEach((node) => {
      const nodeIngredients = ingredients[node];
      const count = compareIngredients(resultIngredients, nodeIngredients);
      if (count > maxIngredients) {
        maxIngredients = count;
        restaurant = node;
      }
    });

    let path = [];
    let currentNode = restaurant;

    while (currentNode) {
      path.unshift(currentNode);
      currentNode = previousNodes[currentNode];
    }
    setShortestPath({
      path,
      distance: distances[restaurant],
    });

    setResult(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div>
      <p>Shortest Path: {result && shortestPath.path.join(" -> ")}</p>
      <p>Distance: {result && shortestPath.distance}</p>
    </div>
  );
};

export default UseDjikstra;
