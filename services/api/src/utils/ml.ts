/**
 * Simple Machine Learning Models for Student Project Demonstration
 */

// 1. Linear Regression Model (Predict Continuous Value)
// Formula: Y = b0 + b1 * X
export class SimpleLinearRegression {
  private b0: number = 0;
  private b1: number = 0;

  // Train the model with historical data
  train(x: number[], y: number[]) {
    const n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    for (let i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumXX += x[i] * x[i];
    }

    const xMean = sumX / n;
    const yMean = sumY / n;

    // Calculate slope (b1) and intercept (b0)
    const numerator = sumXY - n * xMean * yMean;
    const denominator = sumXX - n * xMean * xMean;
    
    this.b1 = denominator === 0 ? 0 : numerator / denominator;
    this.b0 = yMean - this.b1 * xMean;
  }

  // Predict new value
  predict(x: number): number {
    return this.b0 + this.b1 * x;
  }
}

// 2. K-Nearest Neighbors Classification (Predict Category)
// Classifies a point based on the majority class of its 'k' nearest neighbors
export class SimpleKNN {
  private k: number;
  private features: number[][] = [];
  private labels: string[] = [];

  constructor(k: number = 3) {
    this.k = k;
  }

  train(features: number[][], labels: string[]) {
    this.features = features;
    this.labels = labels;
  }

  private euclideanDistance(point1: number[], point2: number[]): number {
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
      sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
  }

  predict(point: number[]): string {
    const distances: { label: string; distance: number }[] = [];

    for (let i = 0; i < this.features.length; i++) {
      distances.push({
        label: this.labels[i],
        distance: this.euclideanDistance(point, this.features[i]),
      });
    }

    // Sort by distance (closest first)
    distances.sort((a, b) => a.distance - b.distance);

    // Get top K neighbors
    const nearest = distances.slice(0, this.k);

    // Count votes
    const votes: Record<string, number> = {};
    let maxVotes = 0;
    let predictedLabel = this.labels[0];

    for (const neighbor of nearest) {
      votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
      if (votes[neighbor.label] > maxVotes) {
        maxVotes = votes[neighbor.label];
        predictedLabel = neighbor.label;
      }
    }

    return predictedLabel;
  }
}
