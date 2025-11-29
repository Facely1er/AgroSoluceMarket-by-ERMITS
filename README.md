# 🌾 AgroSoluce® Marketplace

Agricultural marketplace platform connecting West African cooperatives with global buyers.

## 🚀 Features

- **Cooperative Directory**: Browse 3,797+ verified cooperatives in Côte d'Ivoire
- **Interactive Map**: Visualize cooperative distribution across regions
- **Search & Filter**: Find cooperatives by name, region, department, or sector
- **Buyer Portal**: Discover and connect with verified cooperatives
- **Cooperative Dashboard**: Manage products, orders, and communications

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet + React Leaflet
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── features/           # Feature modules
│   ├── cooperatives/   # Cooperative management
│   ├── products/       # Product listings
│   ├── buyers/         # Buyer portal
│   ├── marketplace/    # Marketplace features
│   └── transactions/   # Transaction management
├── pages/             # Page components
│   ├── marketplace/   # Public marketplace pages
│   ├── buyer/         # Buyer portal pages
│   └── cooperative/   # Cooperative dashboard
├── components/         # Reusable components
│   ├── layout/        # Layout components
│   ├── ui/            # UI components
│   └── marketplace/   # Marketplace-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and libraries
│   ├── utils/         # Helper functions
│   └── supabase/      # Supabase integration (future)
└── types/             # TypeScript type definitions
```

## 🗺️ Routes

- `/` - Marketplace homepage
- `/cooperatives` - Cooperative directory with search and filters
- `/cooperatives/:id` - Individual cooperative profile
- `/buyer/*` - Buyer portal
- `/cooperative/*` - Cooperative dashboard

## 📊 Data

Cooperative data is loaded from `/public/cooperatives_cote_ivoire.json` containing 3,797+ verified cooperatives.

## 🔐 Access Control

Contact information is gated behind access control. Use access code `AGRO-ACCESS-2025` for development.

## 🚧 Roadmap

- [ ] Supabase backend integration
- [ ] Product listing management
- [ ] Buyer-seller matching engine
- [ ] Transaction and payment processing
- [ ] Real-time messaging
- [ ] Mobile applications
- [ ] EUDR compliance automation

## 📝 License

Copyright © 2025 AgroSoluce by ERMITS. All rights reserved.

