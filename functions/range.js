
// Version 1.
function range(start = 1, end = null, step = 1) {
  if (end === null) {
    [start, end] = [0, start];
  }
  const nextStep = (start > end) ? -step : step;  
  const isFirstLessThanSecond = (first, second) => (first < second);
  const OrderByAsc = (end) => (current) => isFirstLessThanSecond(end, current);
  const OrderByDesc = (end) => (current) => isFirstLessThanSecond(current, end);
  const isLast = (Math.sign(nextStep) === 1) ? OrderByAsc(end) : OrderByDesc(end);
  
  return (function nextNumber(current){ 
    return isLast(current+nextStep) && [current]
           || [current, ...nextNumber(current+nextStep)]
  })(start)
}

// Version 2.
function range(start = 1, end = null, step = 1) {
  if (end === null) {
    [start, end] = [1, start];
  }
  const intervalSize = Math.floor(Math.abs(end-start)/step) + 1
  const sign = Math.sign(end-start);
  const rangeFn = (number, index) => number + (index * step * sign);
  return Array(intervalSize).fill(start).map(rangeFn);
}
