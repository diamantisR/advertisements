import { InferSchemaType, model, Schema } from 'mongoose';

const advertisementSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    area: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    file: { type: String, required: false },
    activated: { type: Boolean }
  },
  { timestamps: true }
);

type Advertisement = InferSchemaType<typeof advertisementSchema>;

export default model<Advertisement>('Advertisement', advertisementSchema);
