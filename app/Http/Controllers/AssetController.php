<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

use App\Models\Category;

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

    public function insertCategory(Request $request)
    {
        $category = new Category;
        $category->category = $request->name;
        $category->save();
        
        return response()->json(['result' => 'ok'], 200);
    }
}
