# Dockerfile para SimUci (FastAPI + Uvicorn)
FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set workdir
WORKDIR /app

# Copia los archivos de requerimientos
COPY requirements.txt ./requirements.txt

# Instala dependencias
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 8000

# Comando de arranque
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
