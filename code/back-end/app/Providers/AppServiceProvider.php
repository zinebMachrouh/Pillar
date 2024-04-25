<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $repositoryFiles = File::glob(app_path('Repositories/*.php'));

        foreach ($repositoryFiles as $file) {
            $className = 'App\\Repositories\\' . pathinfo($file, PATHINFO_FILENAME);
            $interfaceName = 'App\\Repositories\\' . pathinfo($file, PATHINFO_FILENAME) . 'Interface';

            $this->app->bind($interfaceName, $className);
        }

        $serviceFiles = File::glob(app_path('Services/*.php'));

        foreach ($serviceFiles as $file) {
            $className = 'App\\Services\\' . pathinfo($file, PATHINFO_FILENAME);
            $interfaceName = 'App\\Services\\' . pathinfo($file, PATHINFO_FILENAME) . 'Interface';

            $this->app->bind($interfaceName, $className);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
