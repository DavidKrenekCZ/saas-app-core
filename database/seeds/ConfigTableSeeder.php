<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ConfigTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('config')->insert([
            'id' => 1,
            'date_from'         => Carbon::now(),
            'date_to'           => Carbon::now(),
            'max_files'         => 10,
            'description1'      => '<p><strong>Lorem ipsum dolor sit amet</strong></p><p>Cras a massa a dui faucibus euismod vel in orci. Quisque augue quam, auctor sed volutpat in, pretium id sem. Morbi vehicula justo ut nunc maximus, non commodo dui sagittis. Fusce efficitur turpis quis nulla venenatis molestie. Donec vitae ultrices mauris, id pharetra nunc. Pellentesque dapibus urna a massa efficitur fermentum. Quisque ac ipsum augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
            'description2'      => '<p><strong>Lorem ipsum dolor sit amet?</strong></p><p>Cras a massa a dui faucibus euismod vel in orci. Quisque augue quam, auctor sed volutpat in, pretium id sem. Morbi vehicula justo ut nunc maximus, non commodo dui sagittis. Fusce efficitur turpis quis nulla venenatis molestie. Donec vitae ultrices mauris, id pharetra nunc. Pellentesque dapibus urna a massa efficitur fermentum. Quisque ac ipsum augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
            'description3'      => 'Připravujeme pro Vás soutěž o hodnotné ceny, máte se na co těšit!',
            'textarea1'         => 'Velká letní fotosoutěž!',
            'textarea2'         => 'MojeFotosoutez.cz - Dejte mi svůj lajk, abych měl šanci vyhrát!',
        ]);
    }
}
