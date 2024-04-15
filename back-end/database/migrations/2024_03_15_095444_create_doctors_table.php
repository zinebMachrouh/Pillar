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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('gender');
            $table->string('address')->nullable();
            $table->string('speciality');
            $table->string('qualifications')->nullable();
            $table->integer('license_number')->nullable();
            $table->string('hospital_affiliation');
            $table->integer('experience')->nullable();
            $table->boolean('availability')->default(false);
            $table->string('working_hours');
            $table->integer('appointment_fee');
            $table->longText('about')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
