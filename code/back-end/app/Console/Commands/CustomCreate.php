<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CustomCreate extends Command
{
    protected $signature = 'custom:create {name}';

    protected $description = 'Create a new service with interface and repository with interface';

    public function handle()
    {
        $name = $this->argument('name');
        $servicePath = app_path('Services/' . $name . 'Service.php');
        $serviceInterfacePath = app_path('Services/' . $name . 'ServiceInterface.php');
        $repositoryPath = app_path('Repositories/' . $name . 'Repository.php');
        $repositoryInterfacePath = app_path('Repositories/' . $name . 'RepositoryInterface.php');

        if (file_exists($servicePath) || file_exists($serviceInterfacePath) || file_exists($repositoryPath) || file_exists($repositoryInterfacePath)) {
            $this->error('Service or Interface or Repository or Interface already exists!');
            return;
        }

        $serviceInterfaceTemplate = "<?php\n\nnamespace App\Services;\n\ninterface " . $name . "ServiceInterface\n{\n    // Define your service interface methods here\n}\n";
        $serviceTemplate = "<?php\n\nnamespace App\Services;\n\nclass " . $name . "Service implements " . $name . "ServiceInterface\n{\n\t// Implement your service logic here\n}\n";
        $repositoryInterfaceTemplate = "<?php\n\nnamespace App\Repositories;\n\ninterface " . $name . "RepositoryInterface\n{\n    // Define your repository interface methods here\n}\n";
        $repositoryTemplate = "<?php\n\nnamespace App\Repositories;\n\nclass " . $name . "Repository implements " . $name . "RepositoryInterface\n{\n\t// Implement your repository logic here\n}\n";

        file_put_contents($serviceInterfacePath, $serviceInterfaceTemplate);
        file_put_contents($servicePath, $serviceTemplate);
        file_put_contents($repositoryInterfacePath, $repositoryInterfaceTemplate);
        file_put_contents($repositoryPath, $repositoryTemplate);

        $this->info('Service, Interface, Repository, and Interface created successfully: ' . $servicePath . ', ' . $serviceInterfacePath . ', ' . $repositoryPath . ', ' . $repositoryInterfacePath);
    }
}
