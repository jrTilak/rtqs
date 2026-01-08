/**
 * Sleeps the execution for the specified number of sec.
 **/
export const sleep = (sec: number): Promise<true> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, sec * 1000);
  });
};
