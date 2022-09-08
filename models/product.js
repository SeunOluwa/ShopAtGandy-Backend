import mongoose from "mongoose";

import slugify from "slugify";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = `${uid()}_${slugify(this.name, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: false,
    strict: true,
    locale: "vi",
    trim: true,
  })}`;
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
