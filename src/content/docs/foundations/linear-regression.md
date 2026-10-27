---
title: Linear regression
description: Predict a number by finding a line that fits the data.
sidebar:
  label: Linear regression
  order: 1
---

## The idea
Linear regression learns a relationship between inputs and a **continuous output**. Think of predicting a house price from its size: the answer is a number, rather than a class.

For one input feature, the model is:

```formula
ŷ = wx + b
```

- **x** is the input feature.
- **w** controls the slope: how much the prediction changes as x increases.
- **b** is the intercept: the prediction when x is zero.
- **ŷ** is the predicted value; **y** is the actual value.

> Learning means adjusting w and b so the predictions fit the training examples.

## Measuring the error
A **loss** measures error for one example. The **cost** aggregates losses across the training set.

Squared-error cost is:

```formula
J(w, b) = (1 / 2m) Σᵢ (wx⁽ⁱ⁾ + b − y⁽ⁱ⁾)²
```

Here, **m** is the number of training examples. Squaring makes every error nonnegative and gives larger errors more weight. The factor 1/2 makes the derivative simpler; it does not change where the minimum is.

## Gradient descent
Start with values for w and b, calculate the cost's derivatives, and move in the direction that reduces cost.

```formula
w ← w − α · ∂J/∂w
b ← b − α · ∂J/∂b
```

Update both parameters using derivatives computed at the same current values. **α**, the learning rate, controls the step size.

- Too small: learning may be slow.
- Too large: the cost may oscillate or diverge.
- Feature scaling can help gradient descent converge more efficiently.

## A small example
Suppose a model predicts **ŷ = 2x + 1**. For x = 3, it predicts 7. If the actual value is 9, the error is −2 and the squared error is 4.

One example helps explain the loss. The cost uses all training examples.

## Keep in mind
A low training cost alone does not prove the model will work on new data. Check a separate validation set and inspect the errors.

Related: [[bias-and-variance|Bias and variance]] explains why a model can fit training data well and still struggle on new examples. For predicting classes, continue to [[logistic-regression|Logistic regression]].
