# AquaTrade — Fisheries E-Commerce Management Platform

A responsive React + Vite frontend demonstration for a B2B fisheries supply-chain marketplace. Built around the concepts in the supplied Fisheries E-Commerce Platform PPT: direct market access, fair and transparent pricing, bulk trade, cold-chain logistics, digital payments, vendor trust, quality assurance and real-time monitoring.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Demo workflow

1. Open **Login** or **Get Started** and choose a role. No password or backend is needed.
2. Sign in as **Fish Farmer**, **Hatchery Farmer**, **Dam Farmer** or **River Contractor** and add a fish listing with quantity, price, location, harvest date and freshness duration.
3. Sign in as **Inventory Manager** to review listings, send counteroffers, accept a deal and manage negotiation status.
4. Use **Delivery management** to schedule pickup, assign a driver, enable cold-chain transport and update delivery status.
5. Sign in as **Administrator** to review marketplace analytics, suppliers, listings, negotiations and delivery operations.

## Demo roles

- Administrator
- Inventory Manager
- Fish Farmer
- Hatchery Farmer
- Dam Farmer
- River Contractor
- Delivery Personnel

## Persistence and limitations

Listings, users and delivery records are stored in browser `localStorage`. This is a static frontend demonstration: authentication is simulated, data is local to the browser, and no real payment, messaging, GPS, API, server-side validation or live logistics integrations are connected. Use a backend, secure authentication and appropriate operational controls before production deployment.

## Project structure

```text
src/
  assets/
  components/       # Reusable UI components, each with its own CSS
  dashboards/       # Role-aware overview
  data/             # Demo seed data
  layouts/          # Dashboard shell and navigation
  pages/            # Homepage and marketplace operations pages
  styles/           # Small application-level base stylesheet
  utils/            # localStorage persistence helpers
```

## Updated order, payment and delivery workflow

1. Fish Farmer submits a fish listing.
2. Inventory Manager starts price negotiation and sends an offer.
3. Fish Farmer accepts the offer or sends a counteroffer.
4. After farmer acceptance, the order status becomes `Farmer accepted`.
5. Only Admin / Inventory Manager can perform `Final confirm order` from Negotiations. This locks the agreed price and moves the deal to `Payment pending`.
6. Inventory Manager records payment in Payments. This project currently simulates payment in localStorage; it does not transfer real money.
7. After payment, Inventory Manager uses `Assign delivery partner` on the paid deal. Partner name, phone, email, destination, pickup time, estimated arrival and cold-chain requirement are recorded.
8. Farmer can view the delivery partner and ETA in Deliveries. Delivery Personnel can update shipment milestones: Assigned, Picked up, In transit, Out for delivery and Delivered.
9. Farmer confirms receipt. Admin and Inventory Manager can view the complete tracking history in Deliveries.

All workflow data is stored in browser localStorage for this demo. A production deployment should move users, listings, payments, delivery assignments and tracking events to authenticated backend APIs, and integrate a real payment gateway and carrier tracking service.
