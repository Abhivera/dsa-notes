//maximum sum of a contiguous subarray.
function kadane(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // Either continue the subarray or start a new one from arr[i]
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);

    // Update the overall max if the current subarray is the largest found so far
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// Example usage:
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(kadane(arr)); // Output: 6
