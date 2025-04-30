# Fantasy Map Editor

A full-stack web tool for creating richly textured, grid-based fantasy maps inspired by classic fantasy worlds like Tolkien's Middle Earth. Users can define custom map sizes, assign terrain and features to grid tiles, and place floating map labels (like cities and rivers). Maps can be saved to a user account and exported as PDF or PNG.

## Features

- User authentication (email + password) 
- Configurable map dimensions and grid sizing (e.g., 100km x 100km with 1km tiles)
- Interactive dashboard to create and manage maps
- Textured terrain tiles: mountains, forests, roads, buildings, etc.
- Floating labels for cities, rivers, and territories
- Zoom in/out, pan around the map
- Save/load from PostgreSQL database (via Prisma ORM)
- Export map to PDF and PNG

## Tech Stack

### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS + ShadCN UI
- Zustand for state management
- PixiJS (for high-performance 2D canvas rendering)

### Backend
- Next.js API routes
- NextAuth for authentication
- Prisma ORM
- PostgreSQL (locally via Docker or cloud via Supabase/Railway)

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/yourusername/fantamap.git
cd fantamap
```

2. Install dependencies:
```bash
npm install
```

3. Configure the environment:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/fantamap"
```

4. Run migrations:
```bash
npx prisma migrate dev --name init
```

5. Start the dev server:
```bash
npm run dev
```

Open http://localhost:3000 to use the app.

## Roadmap

- [x] Auth system (NextAuth w/ credentials)
- [x] Dashboard with map list
- [x] Create and save map metadata
- [ ] Map editor with PixiJS grid
- [ ] Sidebar for tile editing
- [ ] Floating labels and title layers
- [ ] Export to PDF / PNG
- [ ] Mobile & tablet responsiveness

##  Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## License

MIT