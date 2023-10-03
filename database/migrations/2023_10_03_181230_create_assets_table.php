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
        Schema::create('assets', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('code')->unique();                 // 자산을 구별하기 위해 UUID를 생성하여 저장함
            $table->unsignedInteger('category');            // 투자방식 (예시: 유동자산, 주식, 수익증권 등)
            $table->unsignedInteger('sales');               // 판매회사 (예시: KB국민은행, KB증권 등)
            $table->unsignedInteger('country');             // 투자국가 (예시: 대한민국, 미합중국, 글로벌 등)
            $table->unsignedInteger('sector');              // 투자섹터 (예시: 바이오산업, 반도체산업 등)
            $table->unsignedInteger('investment_type');     // 투자성격 (예시: 자본투자, 미래가치투자 등)
            $table->char('name', 100);
            $table->unsignedInteger('units');               // 투자단위 (주식이나 펀드의 경우 지분)
            $table->char('currency_unit');                  // 화폐단위 (예시: won, dollar, euro 등)
            $table->unsignedInteger('price');               // 단위가격 (화폐단위 고려하여 저장)
            $table->unsignedInteger('charge');              // 수수료 (화폐단위 고려하여 저장)
            $table->timestamps();                           // created_at, updated_at
            $table->softDeletes();
            $table->index(['category', 'sector', 'created_at', 'updated_at']);
            $table->foreign('category')->references('id')->on('categories');
            $table->foreign('sales')->references('id')->on('sales');
            $table->foreign('country')->references('id')->on('countries');
            $table->foreign('sector')->references('id')->on('sectors');
            $table->foreign('investment_type')->references('id')->on('investment_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
