export function getAvg(scores:number[]):number {
 return getTotalScore(scores) / scores.length;
}

function getTotalScore(scores:number[]):number {
  return scores.reduce((totalScore, currentScore) => {
    return totalScore + currentScore;
  });
}
