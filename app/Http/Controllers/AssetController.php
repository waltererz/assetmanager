<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class AssetController extends Controller
{
    public function show() : View
    {
        return view('assets/list');
    }

    public function showSettingVariables() : View
    {
        return view('assets/setting_variables');
    }
}
