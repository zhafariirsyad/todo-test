# Todo App

Project ini merupakan aplikasi todo sederhana yang berjalan menggunakan Laravel, Inertia.js, dan PostgreSQL.
Mohon maaf untuk python dan laravelnya masih ada kendala saat dijalankan di dockernya.

### 1. Duplikat File `.env`
- Duplikat file `.env.example` dan rename menjadi `.env`.
- File `.env.example` sudah disesuaikan konfigurasinya

### 2. Menjalankan Docker

Untuk menjalankan proyek ini menggunakan Docker:

1. Pastikan sudah menginstall **Docker** dan **Docker Compose**.
2. Jalankan perintah berikut di terminal:

```bash
docker-compose up -d --build
```

### 3. Migration dan Seeder
- Jalankan migration untuk menambahkan table kedalam database:
  ```bash
    php artisan migrate
- Jalankan seeder untuk menambahkan data dummy kedalam database
  ```bash
    php artisan db:seed