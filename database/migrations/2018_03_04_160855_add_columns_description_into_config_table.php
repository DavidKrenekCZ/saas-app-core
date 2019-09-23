<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsDescriptionIntoConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('config', function (Blueprint $table) {
            $table->text('description1');
            $table->text('description2');
            $table->text('description3');
            $table->text('textarea1');
            $table->text('textarea2');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('config', function (Blueprint $table) {
            $table->dropColumn('description1');
            $table->dropColumn('description2');
            $table->dropColumn('description3');
            $table->dropColumn('textarea1');
            $table->dropColumn('textarea2');
        });
    }
}
