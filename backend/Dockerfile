# Gunakan image Python resmi
FROM python:3.11

# Set direktori kerja di dalam container
WORKDIR /app

# Copy requirements dan install dependencies
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy semua source code ke dalam container
COPY . .

# Jalankan server FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
