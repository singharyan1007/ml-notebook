---
title: Logistic regression
description: Turn a weighted sum into a probability for binary classification.
sidebar:
  label: Logistic regression
  order: 2
---

## The idea
Logistic regression is used for **classification**, despite its name. In a binary task, it models the probability that an example belongs to class 1.

Examples include spam versus not spam, or a handwritten digit being 1 versus not 1.

## From score to probability
First calculate a linear score, then apply the sigmoid function:

```formula
z = w · x + b
p = σ(z) = 1 / (1 + e⁻ᶻ)
```

Sigmoid maps any real-valued score to a value between 0 and 1. When z = 0, p = 0.5.

A common decision rule predicts class 1 when p ≥ 0.5. The threshold can change with the task and the costs of different mistakes.

> A probability is the model's estimate. A class label is a decision made using that estimate.

## Why use log loss?
For one training example, binary cross-entropy is:

```formula
L(p, y) = −y log(p) − (1 − y) log(1 − p)
```

- If y = 1, loss is −log(p): predicting a small probability is costly.
- If y = 0, loss is −log(1 − p): predicting a large probability is costly.
- A confident, incorrect prediction receives a large penalty.

The cost J is the average of these losses across the training examples. Unlike squared error applied through sigmoid, this standard objective is convex in the parameters for ordinary logistic regression.

## A small example
For a positive example (y = 1):

| Predicted probability | Loss, approximately |
| --- | --- |
| 0.9 | 0.105 |
| 0.5 | 0.693 |
| 0.1 | 2.303 |

These values use the natural logarithm. As confidence in the correct class falls, loss rises.

## Regularization
L2 regularization adds a penalty for large weights:

```formula
J_regularized = J + (λ / 2m) Σⱼ wⱼ²
```

The bias b is usually not penalized in this formulation. Larger λ pushes weights toward smaller values. Excessive regularization can underfit the data.

For a particular weight wⱼ, differentiating the penalty gives **(λ/m)wⱼ**. The sum disappears because the other weights are constants with respect to wⱼ.

## Keep in mind
Classification accuracy and log loss measure different things. Two models can predict the same classes but assign different probabilities.

Related: [[linear-regression|Linear regression]] shares the weighted-sum idea. [[neural-networks|Neural networks]] combine many trainable units to learn richer relationships.
