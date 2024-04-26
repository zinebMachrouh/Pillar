<?php

namespace App\Http\Controllers;

use App\Mail\SendVerificationCode;
use App\Models\VerificationCode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class VerificationCodeController extends Controller
{
    public function generateCode()
    {
        $user = Auth::user();
        $code = $this->generateUniqueCode();

        $verificationCode = VerificationCode::create([
            'user_id' => $user->id,
            'code' => $code,
            'expires_at' => Carbon::now()->addMinutes(30),  
        ]);

        Mail::to($user->email)->send(new SendVerificationCode($code, $user->name));
        return $verificationCode;
    }

    private function generateUniqueCode()
    {
        return rand(100000, 999999); 
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = Auth::user(); 
        $code = $request->input('code');

        $verificationCode = VerificationCode::where('user_id', $user->id)
            ->where('code', $code)
            ->first();

        if (!$verificationCode) {
            return response()->json(['message' => 'Invalid code provided.'], 404);
        }

        if ($verificationCode->used || $verificationCode->expires_at < Carbon::now()) {
            return response()->json(['message' => 'This code is either expired or has already been used.'], 400);
        }

        $verificationCode->used = true;
        $verificationCode->save();

        return response()->json(['message' => 'Verification successful.'], 200);
    }
}
