const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const udashItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const udashItem = mongoose.model("udashItem", udashItemSchema);
module.exports = udashItem;
