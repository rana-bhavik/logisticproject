import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  companyId: mongoose.Types.ObjectId;
  status: 'Pending' | 'Assigned' | 'In Transit' | 'Delivered' | 'Cancelled';
  pickupAddress: string;
  deliveryAddress: string;
  cargoDetails: {
    weight: number;
    volume: number;
    type: string;
  };
  scheduledPickupTime: Date;
  scheduledDeliveryTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Assigned', 'In Transit', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  cargoDetails: {
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
    type: { type: String, required: true }
  },
  scheduledPickupTime: { type: Date, required: true },
  scheduledDeliveryTime: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
