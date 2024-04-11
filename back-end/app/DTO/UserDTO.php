<?php

namespace App\DTO;

use Illuminate\Support\Facades\Hash;

class UserDTO
{
    public $name;
    public $email;
    public $password;
    public $phone_number;
    public $role_id;

    public function __construct($name, $email, $password, $phone_number, $role_id)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->phone_number = $phone_number;
        $this->role_id = $role_id;
    }

    public static function fromRequest(array $data)
    {
        return new self(
            $data['name'],
            $data['email'],
            Hash::make($data['password']),
            $data['phone_number'],
            $data['role_id']
        );
    }

    public function toArray()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'phone_number' => $this->phone_number,
            'role_id' => $this->role_id,
        ];
    }
}
