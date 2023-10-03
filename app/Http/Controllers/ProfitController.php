<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class ProfitController extends Controller
{
    public function showReport() : View
    {
        return view('profit/report');
    }

    public function showBasePrice() : View
    {
        return view('profit/baseprice');
    }
}
