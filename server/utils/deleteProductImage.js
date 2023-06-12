const fs = require("fs");
const path = require("path");

function deleteProductImage(product) {
  if (!product.photo || !product.photo.path) {
    console.log("Product photo path is undefined or null.");
    return;
  }
  const filePath = path.resolve(__dirname, "..", product.photo.path);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Associated product image ${filePath} was deleted from your server.`
      );
    }
  });
}

module.exports = deleteProductImage;
