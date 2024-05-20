<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tutor>
 */
class TutorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tutor=storage_path('app/public/tutor');
        if (is_dir($tutor)) {
            File::deleteDirectory($tutor);
        }
        mkdir($tutor);
        $imagePath=$this->faker->image(storage_path('app/public/tutor'), 640, 480, 'tutor', false);
        return [
            'name' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'documentnumber' => $this->faker->unique()->numerify('##########'),
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'),  // Hashear la contraseña
            'photo' =>$imagePath  // URL de una imagen de persona
        ];
    }
}
