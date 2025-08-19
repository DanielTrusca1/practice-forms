// Mock API call to check username avaiability
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const asyncValidate = async (value) => {
  await sleep(1300);

  if (value.username.toLowerCase().startsWith("john")) {
    return "Username is already taken";
  }

  // Validation is successfull
  return undefined;
};

export default asyncValidate;
