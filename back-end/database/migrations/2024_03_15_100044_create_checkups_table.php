<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('checkups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('doctor_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->longText('symptoms');
            $table->longText('diagnosis');
            $table->longText('treatment_plan');
            $table->dateTime('follow_up_date');
            $table->longText('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkups');
    }
};
