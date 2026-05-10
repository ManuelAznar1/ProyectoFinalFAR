<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    
    public function registrar(Request $request) {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'gmail' => 'required|string|email|unique:usuarios,gmail',
            'password' => 'required|string|min:6',
        ]);

        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'gmail' => $request->gmail,
            'password' => Hash::make($request->password), 
        ]);

        return response()->json([
            'message' => '¡Usuario registrado correctamente!',
            'user' => $usuario
        ], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'gmail' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = Usuario::where('gmail', $request->gmail)->first();
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'message' => 'El correo o la contraseña no son correctos.'
            ], 401); 
        }

        return response()->json([
            'message' => '¡Login exitoso!',
            'user' => [
                'nombre' => $usuario->nombre,
                'gmail' => $usuario->gmail
            ]
        ], 200);
    }
}