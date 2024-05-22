<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' =>$this->faker->firstName,
            'lastname'=>$this->faker->lastName,
            'phone'=> $this->faker->phoneNumber,
            'email'=>$this->faker->unique()->safeEmail,
            'password'=> Hash::make('password'),
            'course_id' => null
        ];
    }
}