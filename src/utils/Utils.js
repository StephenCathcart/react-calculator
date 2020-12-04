export const generateOptions = (start, end) => Array((end * 2) - start + 1).fill().map((_, index) => {
  const duration = index / 2;
  return { value: duration, displayValue: `${duration} Hour(s)` };
})

export const calculateScore = (durationInBed, durationAsleep) => {
  return durationInBed !== 0 ? 100 * (durationAsleep / durationInBed) : 0;
}

export const isFormValid = (selects) => Object.values(selects).every(select => select.value !== "");