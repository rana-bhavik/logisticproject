import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  industry: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Suspended';
  headquartersAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  industry: { type: String, default: 'Logistics' },
  plan: { type: String, enum: ['Starter', 'Professional', 'Enterprise'], default: 'Starter' },
  status: { type: String, enum: ['Active', 'Suspended'], default: 'Active' },
  headquartersAddress: { type: String },
}, { timestamps: true });

export default mongoose.model<ICompany>('Company', CompanySchema);
