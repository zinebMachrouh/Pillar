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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('gender');
            $table->date('birthday');
            $table->string('address')->nullable();
            $table->string('emergency_contact_name');
            $table->integer('emergency_contact_number');
            $table->string('insurance_provider');
            $table->string('insurance_policy_number');
            $table->date('last_visit');
            $table->longText('medical_history');
            $table->longText('allergies');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
