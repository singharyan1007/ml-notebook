---
title: Bias and variance
description: Understand underfitting, overfitting, and performance on unseen data.
sidebar:
  label: Bias and variance
  order: 3
---

## The idea
**Generalization** means doing well on new examples, beyond the data used for training.

Imagine learning for an exam. Memorizing the practice answers may work on those exact questions. Understanding the patterns helps when the questions change.

## High bias: missing the pattern
A high-bias model makes assumptions that are too restrictive to capture the important relationship. This often shows up as **underfitting**.

For example, fitting a straight line to a strongly curved relationship may miss the pattern even in the training data.

- Training error is high relative to an appropriate baseline.
- Validation error is also high.
- A more expressive model or more informative features may help.

## High variance: fitting the noise
A high-variance model is sensitive to the particular training sample. It may learn accidental details that do not hold in new data. This often shows up as **overfitting**.

For example, a very flexible curve can pass through every training point but swing wildly between them.

- Training error is low.
- Validation error is substantially higher.
- More representative data, regularization, or a simpler model may help.

> Low training error is useful only when the learned pattern also works on unseen examples.

## Read the errors together
| Pattern | Common interpretation | What to investigate |
| --- | --- | --- |
| High training and validation error | Possible high bias | Features, model capacity, optimization |
| Low training error, higher validation error | Possible high variance | Regularization, data quantity, complexity |
| Low training and validation error | Encouraging generalization | Confirm on a held-out test set |

“High” and “low” depend on the task, baseline, and noise in the data. A model can have both high bias and high variance. These patterns are clues, not a complete diagnosis.

## Use the data splits well
1. **Training set:** fit the model's parameters.
2. **Validation set:** choose model settings and compare alternatives.
3. **Test set:** estimate final performance after those choices.

Repeatedly tuning against the test set makes it less useful as an independent check. Also check for data leakage and differences between the training and deployment data.

## Keep in mind
In this context, **variance** means sensitivity to the training data. It is related to, but not identical to, calculating the statistical variance of one list of numbers.

Related: revisit [[linear-regression|Linear regression]] or consider how model capacity changes with [[neural-networks|Neural networks]].
