const checkErr = (err) => {
  if (err.kind === "ObjectId") {
    return { status: 400, message: "Invalid Product Id." };
  } else if (err.code === "LIMIT_FILE_SIZE") {
    return { status: 413, message: "Product photo size too large." };
  } else if (
    err.message === "Only .png .jpg  .jpeg and .svg uploads allowed."
  ) {
    return {
      status: 415,
      message: "Only .png .jpg  .jpeg and .svg uploads allowed.",
    };
  }

  return { status: 500, message: "Something went wrong." };
};

module.exports = checkErr;
