// Mock API call to check username avaiability
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const asyncValidate = async (values) => {
  await sleep(1300);

  if (values.username.toLowerCase().startsWith("john")) {
    console.log("Username is already taken");
  }
};

export default asyncValidate;
