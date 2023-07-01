const checkErr = (err) => {
  if (err.kind === "ObjectId") {
    return { status: 400, message: "Invalid Product Id." };
  }

  return { status: 500, message: "Something went wrong." };
};

module.exports = checkErr;
