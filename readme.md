# BC Flow

BC Flow System

## Clone the BCFlow repo from GitHub

```
git clone git@github.com:Ahykaa/Capstone-2.git

```

## Installation

### 1. Backend Setup:

Update `api/.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bcflow_system
DB_USERNAME=root
DB_PASSWORD=
```

```
cd api
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
```

Default Admin Credential

```
Username: admin
Password: !p@ssword123
```
