import mongoose, { Schema, Document } from 'mongoose';

export interface IShipment extends Document {
  trackingNumber: string;
  orderIds: mongoose.Types.ObjectId[];
  vehicleId?: mongoose.Types.ObjectId;
  driverId?: mongoose.Types.ObjectId;
  status: 'Planning' | 'In Transit' | 'Delayed' | 'Completed';
  currentLocation?: {
    lat: number;
    lng: number;
    timestamp: Date;
  };
  estimatedCompletionTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentSchema: Schema = new Schema({
  trackingNumber: { type: String, required: true, unique: true },
  orderIds: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  driverId: { type: Schema.Types.ObjectId, ref: 'User' }, // Assuming drivers are in User collection
  status: { 
    type: String, 
    enum: ['Planning', 'In Transit', 'Delayed', 'Completed'], 
    default: 'Planning' 
  },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number },
    timestamp: { type: Date }
  },
  estimatedCompletionTime: { type: Date },
}, { timestamps: true });

export default mongoose.model<IShipment>('Shipment', ShipmentSchema);
