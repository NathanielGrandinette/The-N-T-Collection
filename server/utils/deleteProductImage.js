const cloudinary = require("../middleware/cloudinary");

async function deleteProductImage(product) {
  if (!product.photo || !product.photo.path) {
    console.log("Product photo path is undefined or null.");
    return;
  }
  console.log(product);
  try {
    const result = await cloudinary.uploader.destroy(
      product.photo?.cloudinaryId
    );

    if (result.result === "ok") {
      console.log(
        "Associated product image was deleted from cloudinary."
      );
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = deleteProductImage;
