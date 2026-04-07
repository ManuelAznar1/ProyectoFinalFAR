import base64
from io import BytesIO
from PIL import Image
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aseguramos que exista una carpeta para guardar las fotos
if not os.path.exists("capturas"):
    os.makedirs("capturas")

class SchemaImagen(BaseModel):
    img_base64: str

@app.post("/reconocer")
async def reconocer(datos: SchemaImagen):
    try:
        # 1. Separar la cabecera del contenido (data:image/jpeg;base64,xxxx)
        # React envía el prefijo, pero para decodificar solo queremos los datos
        header, encoded = datos.img_base64.split(",", 1)
        
        # 2. Decodificar el texto Base64 a bytes
        image_data = base64.b64decode(encoded)
        
        # 3. Convertir esos bytes en una imagen usando Pillow (PIL)
        imagen = Image.open(BytesIO(image_data))
        
        # 4. Guardar la imagen en la carpeta 'capturas'
        ruta_archivo = "capturas/foto_webcam.jpg"
        imagen.save(ruta_archivo)
        
        print(f"¡Imagen guardada con éxito en {ruta_archivo}!")
        
        return {
            "status": "ok", 
            "mensaje": "¡Imagen recibida y guardada en el servidor!"
        }
        
    except Exception as e:
        print(f"Error procesando la imagen: {e}")
        return {"status": "error", "mensaje": str(e)}