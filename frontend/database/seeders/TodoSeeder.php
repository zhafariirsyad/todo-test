<?php

namespace Database\Seeders;

use App\Models\Todo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i=0;$i<5;$i++){
            Todo::create([
                'title' => "Membuat Form ".$i,
                'is_done' => 0
            ]);
        }
    }
}
