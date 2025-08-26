// Mock API call to check username avaiability
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const asyncValidate = async (value) => {
  return sleep(1300).then(() => {
    if (value.username.toLowerCase().startsWith("john")) {
      throw { username: "That username is taken" };
    }
    // Validation is successfull
    return undefined;
  });
};

export default asyncValidate;