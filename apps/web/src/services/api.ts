/**
 * Central API Client for Enterprise Logistics & Telematics Platform
 * Connects to Express 5 Backend at http://localhost:5000/api
 * Includes JWT auth injection, typed payloads, and resilient enterprise fallback defaults.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token') || '';
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Generic request helper with automatic fallback
async function request<T>(endpoint: string, options: RequestInit = {}, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(errBody.message || `API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API] Notice on ${endpoint}:`, (error as Error).message);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
}

// ------------------- ORDERS & SHIPMENTS -------------------
export interface OrderItem {
  sku: string;
  description: string;
  quantity: number;
  weightKg: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  sender: { name: string; address: string; city: string; country: string; contactPhone?: string };
  recipient: { name: string; address: string; city: string; country: string; contactPhone?: string };
  items: OrderItem[];
  totalWeightKg: number;
  totalVolumeCbm?: number;
  freightType: 'Standard' | 'Express' | 'Refrigerated' | 'Hazardous';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'In_Transit' | 'Delivered' | 'Cancelled';
  assignedShipmentId?: string;
  createdAt: string;
}

export interface Shipment {
  _id: string;
  trackingNumber: string;
  carrier: string;
  transportMode: 'Truck' | 'Air' | 'Sea' | 'Rail';
  status: 'Draft' | 'Manifested' | 'Dispatched' | 'In_Transit' | 'Out_For_Delivery' | 'Delivered' | 'Exception';
  origin: { hubName: string; city: string; country: string; coordinates: [number, number] };
  destination: { hubName: string; city: string; country: string; coordinates: [number, number] };
  currentLocation?: {
    lat: number;
    lng: number;
    speedKmh: number;
    heading: number;
    altitudeMeters?: number;
    updatedAt: string;
  };
  estimatedDeliveryDate?: string;
  assignedDriverId?: string;
  assignedVehicleId?: string;
  orders: string[];
}

export const ordersApi = {
  list: (status?: string) =>
    request<{ success: boolean; orders: Order[]; total: number }>(
      `/orders${status ? `?status=${status}` : ''}`,
      { method: 'GET' },
      {
        success: true,
        total: 6,
        orders: [
          {
            _id: 'ord-101',
            orderNumber: 'ORD-EU-8921',
            sender: { name: 'Acme Semiconductor Ltd', address: 'Tech Park 4', city: 'Munich', country: 'Germany' },
            recipient: { name: 'Tesla Gigafactory Berlin', address: 'Grünheide 1', city: 'Berlin', country: 'Germany' },
            items: [{ sku: 'CHIP-M2-AI', description: 'Silicon microchips pallet', quantity: 400, weightKg: 850 }],
            totalWeightKg: 850,
            freightType: 'Express',
            priority: 'Urgent',
            status: 'In_Transit',
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
          {
            _id: 'ord-102',
            orderNumber: 'ORD-APAC-4412',
            sender: { name: 'Shanghai Port Terminal', address: 'Yangshan Dock 8', city: 'Shanghai', country: 'China' },
            recipient: { name: 'Rotterdam EuroMax Logistics', address: 'Maasvlakte 2', city: 'Rotterdam', country: 'Netherlands' },
            items: [{ sku: 'SOLAR-CELL-500W', description: 'Photovoltaic cells', quantity: 1200, weightKg: 14500 }],
            totalWeightKg: 14500,
            freightType: 'Standard',
            priority: 'High',
            status: 'Processing',
            createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
          },
          {
            _id: 'ord-103',
            orderNumber: 'ORD-US-7719',
            sender: { name: 'BioPharma Global Inc', address: 'Kendall Square 12', city: 'Cambridge', country: 'USA' },
            recipient: { name: 'Heathrow Cold Storage', address: 'Terminal 4 Cargo', city: 'London', country: 'UK' },
            items: [{ sku: 'VAX-COLD-CHAIN', description: 'Enzyme temperature sensitive', quantity: 80, weightKg: 140 }],
            totalWeightKg: 140,
            freightType: 'Refrigerated',
            priority: 'Urgent',
            status: 'Confirmed',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            _id: 'ord-104',
            orderNumber: 'ORD-LATAM-1094',
            sender: { name: 'Santos Coffee Exporters', address: 'Docas do Porto', city: 'Santos', country: 'Brazil' },
            recipient: { name: 'Lavazza Roastery', address: 'Via Bologna 32', city: 'Turin', country: 'Italy' },
            items: [{ sku: 'ARABICA-PREM-GRN', description: 'Green Arabica beans', quantity: 600, weightKg: 28000 }],
            totalWeightKg: 28000,
            freightType: 'Standard',
            priority: 'Medium',
            status: 'In_Transit',
            createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
          },
          {
            _id: 'ord-105',
            orderNumber: 'ORD-ME-3058',
            sender: { name: 'Jebel Ali Freezone Hub', address: 'Gate 4 Industrial', city: 'Dubai', country: 'UAE' },
            recipient: { name: 'Singapore Changi Gateway', address: 'Airport Cargo Road', city: 'Singapore', country: 'Singapore' },
            items: [{ sku: 'AERO-TITANIUM-PARTS', description: 'Turbine casing alloy', quantity: 15, weightKg: 3200 }],
            totalWeightKg: 3200,
            freightType: 'Express',
            priority: 'High',
            status: 'Delivered',
            createdAt: new Date(Date.now() - 3600000 * 64).toISOString(),
          },
          {
            _id: 'ord-106',
            orderNumber: 'ORD-AF-5501',
            sender: { name: 'Cape Town Wine Cellars', address: 'Stellenbosch 14', city: 'Cape Town', country: 'South Africa' },
            recipient: { name: 'Harrods Wine Vaults', address: 'Knightsbridge 87', city: 'London', country: 'UK' },
            items: [{ sku: 'VINTAGE-PINOTAGE', description: 'Reserve oak bottles', quantity: 300, weightKg: 1800 }],
            totalWeightKg: 1800,
            freightType: 'Refrigerated',
            priority: 'Medium',
            status: 'Pending',
            createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
          },
        ],
      }
    ),

  create: (data: Partial<Order>) =>
    request<{ success: boolean; order: Order }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: Order['status'], note?: string) =>
    request<{ success: boolean; order: Order }>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    }),
};

export const shipmentsApi = {
  list: (status?: string) =>
    request<{ success: boolean; shipments: Shipment[] }>(
      `/shipments${status ? `?status=${status}` : ''}`,
      { method: 'GET' },
      {
        success: true,
        shipments: [
          {
            _id: 'shp-901',
            trackingNumber: 'TRK-GL-89104',
            carrier: 'Logistis Trans-Euro Express',
            transportMode: 'Truck',
            status: 'In_Transit',
            origin: { hubName: 'Frankfurt Hub', city: 'Frankfurt', country: 'Germany', coordinates: [50.1109, 8.6821] },
            destination: { hubName: 'Paris CDG Gateway', city: 'Paris', country: 'France', coordinates: [49.0097, 2.5479] },
            currentLocation: { lat: 49.6116, lng: 6.1319, speedKmh: 88, heading: 245, updatedAt: new Date().toISOString() },
            estimatedDeliveryDate: new Date(Date.now() + 3600000 * 6).toISOString(),
            orders: ['ord-101'],
          },
          {
            _id: 'shp-902',
            trackingNumber: 'TRK-GL-22091',
            carrier: 'CMA CGM Ocean Vessel Andromeda',
            transportMode: 'Sea',
            status: 'In_Transit',
            origin: { hubName: 'Port of Shanghai', city: 'Shanghai', country: 'China', coordinates: [31.2304, 121.4737] },
            destination: { hubName: 'Port of Rotterdam', city: 'Rotterdam', country: 'Netherlands', coordinates: [51.9244, 4.4777] },
            currentLocation: { lat: 12.8275, lng: 45.0125, speedKmh: 38, heading: 295, updatedAt: new Date().toISOString() },
            estimatedDeliveryDate: new Date(Date.now() + 3600000 * 96).toISOString(),
            orders: ['ord-102'],
          },
          {
            _id: 'shp-903',
            trackingNumber: 'TRK-GL-77103',
            carrier: 'Lufthansa Cargo SkyMaster 777F',
            transportMode: 'Air',
            status: 'In_Transit',
            origin: { hubName: 'New York JFK', city: 'New York', country: 'USA', coordinates: [40.6413, -73.7781] },
            destination: { hubName: 'London Heathrow LHR', city: 'London', country: 'UK', coordinates: [51.47, -0.4543] },
            currentLocation: { lat: 53.1424, lng: -28.5204, speedKmh: 890, heading: 78, altitudeMeters: 10600, updatedAt: new Date().toISOString() },
            estimatedDeliveryDate: new Date(Date.now() + 3600000 * 3).toISOString(),
            orders: ['ord-103'],
          },
        ],
      }
    ),

  trackPublic: (trackingNumber: string) =>
    request<{ success: boolean; shipment: Shipment }>(`/shipments/track/${trackingNumber}`),

  postTelemetry: (shipmentId: string, telemetry: any) =>
    request<{ success: boolean; telemetry: any }>(`/shipments/${shipmentId}/telemetry`, {
      method: 'POST',
      body: JSON.stringify(telemetry),
    }),
};

// ------------------- FLEET & TELEMATICS -------------------
export interface Vehicle {
  _id: string;
  vehicleNumber: string;
  vin: string;
  type: 'Truck' | 'Van' | 'Electric_Semi' | 'Cargo_Plane' | 'Freight_Vessel';
  status: 'Active' | 'In_Transit' | 'Maintenance' | 'Idle' | 'Decommissioned';
  currentDriver?: { _id: string; fullName: string; phone?: string };
  telematics: {
    lastPing: string;
    latitude: number;
    longitude: number;
    speedKmh: number;
    fuelLevelPct: number;
    batteryLevelPct?: number;
    odometerKm: number;
    engineTempC: number;
    diagnosticsOk: boolean;
  };
}

export const fleetApi = {
  list: () =>
    request<{ success: boolean; vehicles: Vehicle[] }>(
      '/fleet',
      { method: 'GET' },
      {
        success: true,
        vehicles: [
          {
            _id: 'veh-01',
            vehicleNumber: 'LOG-TRK-108',
            vin: '1HD1KRE12MB901844',
            type: 'Electric_Semi',
            status: 'In_Transit',
            currentDriver: { _id: 'drv-01', fullName: 'Marcus Lindqvist' },
            telematics: {
              lastPing: new Date().toISOString(),
              latitude: 49.6116,
              longitude: 6.1319,
              speedKmh: 88,
              fuelLevelPct: 82,
              batteryLevelPct: 76,
              odometerKm: 42180,
              engineTempC: 68,
              diagnosticsOk: true,
            },
          },
          {
            _id: 'veh-02',
            vehicleNumber: 'LOG-VOL-402',
            vin: '4V4NC9EJ8NN449102',
            type: 'Truck',
            status: 'Active',
            currentDriver: { _id: 'drv-02', fullName: 'Elena Rostova' },
            telematics: {
              lastPing: new Date().toISOString(),
              latitude: 52.52,
              longitude: 13.405,
              speedKmh: 0,
              fuelLevelPct: 94,
              odometerKm: 128400,
              engineTempC: 72,
              diagnosticsOk: true,
            },
          },
          {
            _id: 'veh-03',
            vehicleNumber: 'LOG-SPR-881',
            vin: 'WD3PE8CD8LP190823',
            type: 'Van',
            status: 'Maintenance',
            currentDriver: { _id: 'drv-03', fullName: 'Carlos Santana' },
            telematics: {
              lastPing: new Date().toISOString(),
              latitude: 48.8566,
              longitude: 2.3522,
              speedKmh: 0,
              fuelLevelPct: 35,
              odometerKm: 78920,
              engineTempC: 98,
              diagnosticsOk: false,
            },
          },
          {
            _id: 'veh-04',
            vehicleNumber: 'SKY-CARGO-77',
            vin: 'BOEING-777-F401',
            type: 'Cargo_Plane',
            status: 'In_Transit',
            currentDriver: { _id: 'drv-04', fullName: 'Capt. James Vance' },
            telematics: {
              lastPing: new Date().toISOString(),
              latitude: 53.14,
              longitude: -28.52,
              speedKmh: 890,
              fuelLevelPct: 62,
              odometerKm: 890400,
              engineTempC: 84,
              diagnosticsOk: true,
            },
          },
        ],
      }
    ),

  getDrivers: () =>
    request<{ success: boolean; drivers: any[] }>(
      '/fleet/drivers',
      { method: 'GET' },
      {
        success: true,
        drivers: [
          { _id: 'drv-01', fullName: 'Marcus Lindqvist', licenseClass: 'Class A CDL', status: 'Active', safetyScore: 98.4 },
          { _id: 'drv-02', fullName: 'Elena Rostova', licenseClass: 'Class A CDL + Hazmat', status: 'Active', safetyScore: 99.1 },
          { _id: 'drv-03', fullName: 'Carlos Santana', licenseClass: 'Class B CDL', status: 'Off_Duty', safetyScore: 94.0 },
          { _id: 'drv-04', fullName: 'Capt. James Vance', licenseClass: 'ATPL Airline Transport', status: 'Active', safetyScore: 100.0 },
        ],
      }
    ),
};

// ------------------- WAREHOUSE & INVENTORY -------------------
export interface InventoryItem {
  _id: string;
  sku: string;
  title: string;
  category: string;
  quantityOnHand: number;
  quantityReserved: number;
  reorderThreshold: number;
  location: { zone: string; aisle: string; shelf: string; bin: string };
  weightKg: number;
  unitValue: number;
}

export interface DockSchedule {
  _id: string;
  dockNumber: string;
  facility: string;
  type: 'Inbound' | 'Outbound';
  carrier: string;
  timeSlot: string;
  status: 'Scheduled' | 'Docked' | 'Loading' | 'Completed' | 'Delayed';
  vehiclePlate: string;
}

export const warehouseApi = {
  getInventory: () =>
    request<{ success: boolean; inventory: InventoryItem[] }>(
      '/warehouse/inventory',
      { method: 'GET' },
      {
        success: true,
        inventory: [
          {
            _id: 'inv-01',
            sku: 'CHIP-M2-AI',
            title: 'Neural Core Silicon Processing Unit',
            category: 'High-Value Electronics',
            quantityOnHand: 1420,
            quantityReserved: 400,
            reorderThreshold: 300,
            location: { zone: 'Secure-A', aisle: 'A3', shelf: 'Tier-2', bin: 'B-14' },
            weightKg: 2.1,
            unitValue: 840,
          },
          {
            _id: 'inv-02',
            sku: 'SOLAR-CELL-500W',
            title: 'Bifacial Solar Panel Unit 500W',
            category: 'Renewable Equipment',
            quantityOnHand: 3400,
            quantityReserved: 1200,
            reorderThreshold: 1000,
            location: { zone: 'Bulk-West', aisle: 'W7', shelf: 'Ground', bin: 'PL-88' },
            weightKg: 24.5,
            unitValue: 125,
          },
          {
            _id: 'inv-03',
            sku: 'VAX-COLD-CHAIN',
            title: 'Enzyme Stabilized Cold Vaccine Vials',
            category: 'Pharma Cold Chain',
            quantityOnHand: 220,
            quantityReserved: 80,
            reorderThreshold: 200,
            location: { zone: 'Cryo-Vault', aisle: 'C1', shelf: 'Sub-Zero', bin: 'F-04' },
            weightKg: 0.25,
            unitValue: 1250,
          },
          {
            _id: 'inv-04',
            sku: 'AERO-TITANIUM-PARTS',
            title: 'Aeronautic Titanium Alloy Flange',
            category: 'Aerospace Engineering',
            quantityOnHand: 45,
            quantityReserved: 15,
            reorderThreshold: 20,
            location: { zone: 'Secure-B', aisle: 'B1', shelf: 'Tier-1', bin: 'AT-09' },
            weightKg: 85.0,
            unitValue: 4800,
          },
        ],
      }
    ),

  adjustStock: (sku: string, delta: number, reason: string) =>
    request<{ success: boolean; item: InventoryItem }>('/warehouse/adjust', {
      method: 'POST',
      body: JSON.stringify({ sku, delta, reason }),
    }),

  getDocks: () =>
    request<{ success: boolean; docks: DockSchedule[] }>(
      '/warehouse/docks',
      { method: 'GET' },
      {
        success: true,
        docks: [
          { _id: 'd-1', dockNumber: 'Gate 01', facility: 'Frankfurt Hub A', type: 'Inbound', carrier: 'DHL Global', timeSlot: '08:00 - 09:30', status: 'Completed', vehiclePlate: 'F-LH-992' },
          { _id: 'd-2', dockNumber: 'Gate 02', facility: 'Frankfurt Hub A', type: 'Inbound', carrier: 'Logistis Semi', timeSlot: '10:00 - 11:30', status: 'Loading', vehiclePlate: 'LOG-TRK-108' },
          { _id: 'd-3', dockNumber: 'Gate 03', facility: 'Frankfurt Hub A', type: 'Outbound', carrier: 'Kuehne+Nagel', timeSlot: '12:00 - 13:30', status: 'Docked', vehiclePlate: 'KN-EU-440' },
          { _id: 'd-4', dockNumber: 'Gate 04', facility: 'Frankfurt Hub A', type: 'Outbound', carrier: 'FedEx Freight', timeSlot: '14:00 - 15:30', status: 'Scheduled', vehiclePlate: 'FX-8819' },
        ],
      }
    ),
};

// ------------------- FINANCE & ANALYTICS -------------------
export interface Invoice {
  _id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  issuedDate: string;
  itemsCount: number;
}

export const financeApi = {
  getLedger: () =>
    request<{
      success: boolean;
      analytics: { totalRevenue: number; operatingCosts: number; netMargin: number; marginPct: number };
      invoices: Invoice[];
    }>(
      '/finance/ledger',
      { method: 'GET' },
      {
        success: true,
        analytics: {
          totalRevenue: 2845000,
          operatingCosts: 1690000,
          netMargin: 1155000,
          marginPct: 40.6,
        },
        invoices: [
          { _id: 'inv-1', invoiceNumber: 'INV-2026-901', clientName: 'Tesla Gigafactory Berlin', amount: 84200, currency: 'USD', status: 'Paid', dueDate: '2026-09-15', issuedDate: '2026-09-01', itemsCount: 4 },
          { _id: 'inv-2', invoiceNumber: 'INV-2026-902', clientName: 'Rotterdam EuroMax Logistics', amount: 312500, currency: 'USD', status: 'Pending', dueDate: '2026-09-28', issuedDate: '2026-09-05', itemsCount: 12 },
          { _id: 'inv-3', invoiceNumber: 'INV-2026-903', clientName: 'BioPharma Global Inc', amount: 145000, currency: 'USD', status: 'Paid', dueDate: '2026-09-12', issuedDate: '2026-08-28', itemsCount: 2 },
          { _id: 'inv-4', invoiceNumber: 'INV-2026-904', clientName: 'Harrods Wine Vaults', amount: 56700, currency: 'USD', status: 'Overdue', dueDate: '2026-09-02', issuedDate: '2026-08-15', itemsCount: 1 },
        ],
      }
    ),
};

// ------------------- AI & PREDICTIVE ROUTING -------------------
export const aiApi = {
  predictETA: (data: { distanceKm: number; transportMode: string; weatherSeverity?: number; trafficFactor?: number; borderDelayMins?: number }) =>
    request<{
      success: boolean;
      prediction: {
        estimatedTravelHours: number;
        estimatedArrivalDate: string;
        riskScore: string;
        co2EmissionsKg: number;
        routeConfidencePct: number;
      };
    }>('/ai/predict-eta', {
      method: 'POST',
      body: JSON.stringify(data),
    }, {
      success: true,
      prediction: {
        estimatedTravelHours: Math.round((data.distanceKm / (data.transportMode === 'Air' ? 800 : 75)) * (1 + (data.weatherSeverity || 1) * 0.05)),
        estimatedArrivalDate: new Date(Date.now() + 3600000 * 8).toISOString(),
        riskScore: 'Low',
        co2EmissionsKg: Math.round(data.distanceKm * 0.14),
        routeConfidencePct: 96.8,
      },
    }),

  optimizeRoute: (stops: string[]) =>
    request<{
      success: boolean;
      optimizedStops: string[];
      totalKm: number;
      fuelSavedPct: number;
      co2ReductionKg: number;
    }>('/ai/optimize-route', {
      method: 'POST',
      body: JSON.stringify({ stops }),
    }, {
      success: true,
      optimizedStops: stops,
      totalKm: 1480,
      fuelSavedPct: 18.4,
      co2ReductionKg: 284,
    }),

  getMaintenanceAlerts: () =>
    request<{ success: boolean; alerts: any[] }>(
      '/ai/predictive-maintenance',
      { method: 'GET' },
      {
        success: true,
        alerts: [
          { vehicleId: 'LOG-SPR-881', component: 'Engine Cooling Unit', severity: 'High', recommendation: 'Thermostat valve blockage detected in sensor telemetry. Service within 48h.', failureRiskPct: 87 },
          { vehicleId: 'LOG-TRK-108', component: 'Regenerative Brake Pads', severity: 'Medium', recommendation: 'Wear telemetry indicates 22% thickness remaining. Schedule pad swap at next hub stop.', failureRiskPct: 41 },
        ],
      }
    ),
};
