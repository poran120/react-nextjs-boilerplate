export const logger = (error: Error | any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    console.log("Internal server error!");
  }
};
