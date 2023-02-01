const fs = require("fs");
const execSync = require("child_process").execSync;

const rawdata = fs.readFileSync("./coder-store/db.json");
const products = JSON.parse(rawdata).products;

function downloadCover() {
  const images = products.reduce((acc, product) => {
    if (!acc.includes(product.cover)) acc.push(product.cover);

    product.images.forEach((img) =>
      !acc.includes(img) ? acc.push(img) : console.log("Image duplicated")
    );
    return acc;
  }, []);

  images.forEach((imgURL) => {
    const filename = imgURL.substring(
      imgURL.lastIndexOf("/") + 1,
      imgURL.length
    );
    execSync(`curl ${imgURL} > ./zImage/${filename}`);
  });
}

function downloadAvatar() {
  const images = products.reduce((acc, product) => {
    product.reviews.forEach((review) =>
      !acc.includes(review.avatarUrl)
        ? acc.push(review.avatarUrl)
        : console.log("Image duplicated")
    );
    return acc;
  }, []);

  images.forEach((imgURL) => {
    const filename = imgURL.substring(
      imgURL.lastIndexOf("/") + 1,
      imgURL.length
    );
    execSync(`curl ${imgURL} > ./zImage/${filename}`);
  });
}
downloadAvatar();
