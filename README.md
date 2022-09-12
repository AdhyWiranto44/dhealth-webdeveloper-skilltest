# D'Health Web Developer Skill Test

## Stack Teknologi

- Laravel
- Next JS
- Bootstrap (Template pribadi)
- MySQL

## Cara Penginstallan

- Clone project ini

```
git clone https://github.com/AdhyWiranto44/dhealth-webdeveloper-skilltest
```

- Masuk ke folder project yaitu `dhealth-webdeveloper-skilltest`

```
cd dhealth-webdeveloper-skilltest
```

- Install dependencies frontend nya

```
npm install
```

- Masuk ke folder project backend laravel `backend`

```
cd backend
```

- Install dependencies backend laravel nya

```
composer install
```

- Generate APP KEY Laravel yang baru

```
php artisan key:generate
```

- Duplikat file `.env.example` dan rename menjadi `.env`

```
cp .env.example .env
```

- Buka file `.env`, ubah beberapa seperti berikut

```
// nama db
DB_DATABASE=dhealth_eprescription

// db username dan password sesuaikan
DB_USERNAME=root
DB_PASSWORD=
```

- Buka DBMS MySQL, buat database dengan nama `dhealth_eprescription`

- Lalu import file sql dump bernama `dhealth_eprescription.sql` yang ada pada folder `backend/backupDatabase`

- Keluar dari folder backend, pastikan telah berada di folder utama project yaitu folder `dhealth-webdeveloper-skilltest`

```
cd ..
```

- Jalan perintah berikut untuk menjalankan frontend dan backend sekaligus

```
npm run dev:all
```

- Jika tidak berfungsi, juga bisa dijalankan satu persatu

```
// FRONTEND
npm run dev

// BACKEND
cd backend
php artisan serve
```

- Buka di web browser dengan url `http://localhost:3000`

- Url backend `http://localhost:8000`
