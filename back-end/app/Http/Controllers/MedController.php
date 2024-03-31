<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedStoreRequest;
use App\Models\Med;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function store(MedStoreRequest $request, $patientId)
    {
        $data = $request->validated();
        $data['patient_id'] = $patientId;
        $data['doctor_id'] = Auth::user()->doctor->id;

        $med = Med::create($data);

        return response()->json(['status' => 'success', 'message' => 'Medication created successfully', 'medication' => $med], 201);
    }

    public function update(MedStoreRequest $request, $id)
    {
        $med = Med::findOrFail($id);
        $data = $request->validated();
        $med->update($data);

        return response()->json(['status' => 'success', 'message' => 'Medication updated successfully', 'medication' => $med]);
    }

    public function destroy($id)
    {
        $med = Med::findOrFail($id);
        $med->delete();

        return response()->json(['status' => 'success', 'message' => 'Medication deleted successfully']);
    }
}
