<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Captura;
use Illuminate\Support\Facades\Storage;

class CapturaController extends Controller
{
    // Método para RECIBIR Y GUARDAR la foto
    public function store(Request $request){
    $archivos = $request->allFiles();

    if (empty($archivos)) {
        return response()->json(['error' => 'No se ha detectado ningún archivo'], 400);
    }

    $file = reset($archivos);

    $extension = strtolower($file->getClientOriginalExtension());
    $extensionesPermitidas = ['jpg', 'jpeg', 'png'];

    if (!in_array($extension, $extensionesPermitidas)) {
        return response()->json([
            'error' => 'Tipo de archivo no permitido',
            'tu_archivo' => $extension,
            'permitidos' => $extensionesPermitidas
        ], 422);
    }

    $path = $file->store('capturas', 'public');

    $nuevaCaptura = Captura::create([
        'nombre' => $file->getClientOriginalName(),
        'ruta' => $path,
    ]);

    return response()->json([
        'message' => '¡Imagen válida guardada!',
        'url' => asset('storage/' . $path)
    ], 201);
}

    // Método para recuperar todas las fotos y enviarlas al front
    public function index()
    {
        $capturas = Captura::all()->map(function ($c) {
            return [
                'id' => $c->id,
                'nombre' => $c->nombre,
                'fecha' => $c->created_at->format('d/m/Y H:i'),
                'url' => asset('storage/' . $c->ruta) 
            ];
        });

        return response()->json($capturas);
    }
}