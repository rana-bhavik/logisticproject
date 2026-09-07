import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  licensePlate: string;
  type: 'Truck' | 'Van' | 'Ship' | 'Plane';
  capacity: {
    weight: number;
    volume: number;
  };
  status: 'Available' | 'In Use' | 'Maintenance';
  companyId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema: Schema = new Schema({
  licensePlate: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Truck', 'Van', 'Ship', 'Plane'], required: true },
  capacity: {
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
  },
  status: { type: String, enum: ['Available', 'In Use', 'Maintenance'], default: 'Available' },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: true });

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
