const convertToLocalTime = (time: Date): number => {
  return time.getTime() + time.getTimezoneOffset() * 60000;
};

export default convertToLocalTime;
