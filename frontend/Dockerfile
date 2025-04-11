FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Install Node.js & npm (untuk frontend build dengan Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy existing application directory contents
COPY . .

# Copy existing application directory permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

RUN npm install

# Set permission for file dan directory node_modules
RUN chmod -R 755 /var/www/html/node_modules

# Install Laravel dependencies
RUN composer install --no-interaction --prefer-dist

# Generate autoload files
RUN composer dump-autoload --optimize

RUN npm run build

# Start PHP-FPM
CMD php -S 0.0.0.0:8006 -t public
