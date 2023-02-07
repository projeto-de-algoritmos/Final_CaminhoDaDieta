import React from "react";
import { useState, useEffect } from "react";
import "vis-network/styles/vis-network.css";
import { DataSet } from "vis-data/peer";
import { Network } from "vis-network/peer";
const nodes = ["CASA", "A", "B", "C", "D", "E", "F", "G", "H"];

const edges = [
  { from: "CASA", to: "A", weight: 10 },
  { from: "A", to: "B", weight: 10 },
  { from: "A", to: "C", weight: 20 },
  { from: "B", to: "D", weight: 15 },
  { from: "C", to: "E", weight: 30 },
  { from: "D", to: "F", weight: 5 },
  { from: "E", to: "G", weight: 20 },
  { from: "F", to: "H", weight: 10 },
  { from: "CASA", to: "H", weight: 40 },
];
const startNode = "CASA";
const ingredients = {
  CASA: [""],
  A: ["Arroz", "Feijão", "Carne"],
  B: ["Arroz", "Feijão", "Carne", "Salada"],
  C: ["Arroz", "Feijão", "Carne", "Salada", "Batata"],
  D: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo"],
  E: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo", "Tomate"],
  F: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo", "Tomate", "Jiló"],
  G: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo", "Tomate", "Jiló", "Abacate"],
  H: ["Arroz", "Feijão", "Carne", "Salada", "Batata", "Ovo", "Tomate", "Jiló", "Abacate", "Maçã"],
};

const UseDjikstra = (prop) => {
  const [shortestPath, setShortestPath] = useState({});
  const [result, setResult] = useState(false);
  const [resultIngredients] = useState(prop);
  const [network, setNetwork] = useState(null);

  const compareIngredients = (resultIngredients, ingredients) => {
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

    const container = document.getElementById("mynetwork");
    const data = {
      nodes: new DataSet([
        { id: 1, label: "CASA" },
        { id: 2, label: "A" },
        { id: 3, label: "B" },
        { id: 4, label: "C" },
        { id: 5, label: "D" },
        { id: 6, label: "E" },
        { id: 7, label: "F" },
        { id: 8, label: "G" },
        { id: 9, label: "H" },
      ]),
      edges: new DataSet([
        { from: 1, to: 2, label: "10" },
        { from: 2, to: 3, label: "10" },
        { from: 2, to: 4, label: "20" },
        { from: 3, to: 5, label: "15" },
        { from: 4, to: 6, label: "30" },
        { from: 5, to: 7, label: "5" },
        { from: 6, to: 8, label: "20" },
        { from: 7, to: 9, label: "10" },
        { from: 1, to: 9, label: "40" },
      ]),
    };
    const options = {};
    setNetwork(new Network(container, data, options));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div>
      <p>Shortest Path: {result && shortestPath.path.join(" -> ")}</p>
      <p>Distance: {result && shortestPath.distance + " Metros"}</p>
      <div id="mynetwork" style={{ height: "400px" }}></div>
    </div>
  );
};

export default UseDjikstra;
