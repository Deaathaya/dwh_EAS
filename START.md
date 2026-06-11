# Data Warehouse Project - How


### Terminal 1: Start Backend API
```bash
cd backend
composer install
php artisan key:generate
mysql -u root -e "CREATE DATABASE IF NOT EXISTS data_warehouse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
php artisan migrate
php artisan db:seed
php artisan serve 
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Expected: `VITE v... ready in ... ms`

### Terminal 3: Access the Application
```bash
# Open in browser
http://localhost:5173
```

You should see the dashboard with data populated from the database.

---

## 📋 Manual Setup (if needed)

### Backend Setup
See `BACKEND_SETUP.md` for detailed instructions including:
- Database configuration
- Migration and seeding
- API endpoint documentation
- Troubleshooting

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 What's Included

### Database Schema (Star Schema)
**Dimension Tables**:
- `dim_produk` - Products (Elektronik, Pakaian)
- `dim_pelanggan` - Customers
- `dim_waktu` - Time periods

**Fact Table**:
- `fact_penjualan` - Sales transactions

Sample data is pre-populated in seeders.

### API Endpoints (all under `/api/`)
- `GET /health` - Health check
- `GET /kategori` - List product categories
- `GET /query/penjualan-per-produk` - Sales by product
- `GET /query/tren-per-bulan` - Monthly trends
- `GET /query/pelanggan-tertinggi` - Top customers

Plus full CRUD for each dimension table.

### Dashboard Features
- 📊 Product sales visualization
- 📈 Monthly trends
- 👥 Top customers
- 🔍 Category filtering
- 📝 Data tables for detailed view

---

## ⚠️ Requirements

- **PHP 8.1+** with MySQL support
- **MySQL 5.7+** or MariaDB
- **Node.js 16+** with npm
- **Composer** for PHP dependencies

---

## 🔧 Automated Setup Script

Instead of manual steps, you can use the provided script:

```bash
cd backend
bash setup.sh
```

This automates:
1. .env file creation
2. Composer install
3. APP_KEY generation
4. Database creation
5. Migrations
6. Seeding

---

## 📖 Documentation

- `BACKEND_SETUP.md` - Detailed backend setup and API docs
- `backend/SETUP.md` - Backend-specific guide
- `frontend/` - React frontend source code

---

## ✅ Verification Checklist

- [ ] PHP and Composer installed
- [ ] MySQL running and accessible
- [ ] Backend API running on http://localhost:3000
- [ ] API health check returns `{"status":"ok"}`
- [ ] Frontend running on http://localhost:5173
- [ ] Dashboard shows data (not "Tidak ada data")
- [ ] Category filter works
- [ ] Chart visualizations render properly

---

## 🆘 Troubleshooting

**Backend won't start**
- Ensure MySQL is running: `mysql.server start` or `service mysql start`
- Check `.env` database credentials
- Run `php artisan migrate:fresh --seed`

**Frontend shows "Tidak ada data"**
- Check backend API is running on port 3000
- Verify database has data: `php artisan tinker` then `Produk::count()`
- Check browser console for API errors

**Port conflicts**
- Backend: Change port in serve command `--port 3001`
- Frontend: Already handles auto-increment, check terminal output

**CORS errors**
- Ensure both backend and frontend are on different ports
- Clear browser cache and reload
- Backend CORS config is in `backend/config/cors.php`

---

## 📝 Notes

- Sample data includes 5 products, 5 customers, 5 time periods, 10 sales
- To reset and re-seed: `php artisan migrate:fresh --seed`
- Dashboard filters by product category with real-time updates
- All currency formatted as Indonesian Rupiah (IDR)

---

## 🎯 Next Steps

1. Verify both backend and frontend are running
2. Test dashboard with different category filters
3. Explore database structure: `php artisan tinker`
4. Review API endpoints: `php artisan route:list`
5. Check project documentation for customization needs
