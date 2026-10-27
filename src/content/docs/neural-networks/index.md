---
title: Neural networks
description: Build richer models by connecting layers of simple trainable units.
sidebar:
  label: Introduction
  order: 4
---

## Start with one neuron
A neuron takes inputs, calculates a weighted sum, adds a bias, and applies an activation function:

```formula
z = w · x + b
a = g(z)
```

Here, **a** is the neuron's output, or activation. The weights and bias are learned from data. The activation function g determines how the score becomes an output.

With a sigmoid activation, this resembles the prediction step in [[logistic-regression|Logistic regression]].

## Connect neurons into layers
A simple feedforward neural network contains:

1. An **input layer** representing the input features.
2. One or more **hidden layers** that transform those features.
3. An **output layer** producing the final prediction.

Each layer's activations become the next layer's inputs. Hidden units can learn useful combinations of earlier features; we do not manually assign a meaning to each neuron.

## Why activation functions matter
Nonlinear activations let the network represent nonlinear relationships. Stacking linear transformations without nonlinear activations still produces a linear transformation.

Common choices include:

| Activation | Expression | Typical role |
| --- | --- | --- |
| ReLU | max(0, z) | Hidden layers |
| Sigmoid | 1 / (1 + e⁻ᶻ) | Binary-classification output |
| Linear | z | Regression output |

The output choice should match the task. Multiclass classification often uses softmax to produce probabilities across classes.

## Forward propagation
During a forward pass, data moves through the layers until the network produces a prediction.

```formula
a⁽⁰⁾ = x
z⁽ˡ⁾ = W⁽ˡ⁾a⁽ˡ⁻¹⁾ + b⁽ˡ⁾
a⁽ˡ⁾ = g⁽ˡ⁾(z⁽ˡ⁾)
```

For a layer with k neurons receiving n inputs, W has shape **(k, n)** for this column-vector convention. Each neuron has its own weights and bias.

## How learning happens
1. Run forward propagation to calculate predictions.
2. Use a loss function to measure prediction error.
3. Use **backpropagation**, applying the chain rule, to calculate gradients.
4. Use an optimizer, such as gradient descent, to update weights and biases.
5. Repeat across the training data and monitor validation performance.

Backpropagation calculates gradients. The optimizer uses those gradients to change the parameters.

## Keep in mind
More layers or neurons increase what a model can represent, but do not automatically improve generalization. The principles in [[bias-and-variance|Bias and variance]] still apply.

A useful first learning exercise is to trace a small network by hand: write down each layer's inputs, weights, scores, activations, and output shapes.
