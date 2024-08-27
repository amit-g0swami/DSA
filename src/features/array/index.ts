const twoSum = (nums: number[], sum: number) => {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const pair = sum - nums[i];
    if (map.has(pair)) {
      return [map.get(pair)!, i];
    }
    map.set(nums[i], i);
  }
  return null;
};

const array = {
  twoSum,
};

export default array;
