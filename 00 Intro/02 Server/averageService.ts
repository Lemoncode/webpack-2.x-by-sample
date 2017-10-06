export function getAvg(scores : number[]) : number {
 return getTotalScore(scores) / scores.length;
}

function getTotalScore(scores : number[]) : number {
  return scores.reduce((score : number, count : number) => {
    return score + count;
  });
}
