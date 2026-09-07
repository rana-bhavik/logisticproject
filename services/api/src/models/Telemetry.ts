import mongoose, { Schema, Document } from 'mongoose';

export interface ITelemetry extends Document {
  shipmentId: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  location: {
    lat: number;
    lng: number;
  };
  speed: number;
  fuelLevel?: number;
  timestamp: Date;
}

const TelemetrySchema: Schema = new Schema({
  shipmentId: { type: Schema.Types.ObjectId, ref: 'Shipment', required: true },
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  speed: { type: Number, required: true },
  fuelLevel: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

// Index for efficient time-series querying
TelemetrySchema.index({ shipmentId: 1, timestamp: -1 });

export default mongoose.model<ITelemetry>('Telemetry', TelemetrySchema);
