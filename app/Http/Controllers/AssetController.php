<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;

use App\Models\Category;

class AssetController extends Controller
{
    public function show(): View
    {
        return view('assets/list');
    }

    public function showSettingVariables(): View
    {
        return view('assets/setting_variables');
    }

    public function showCategories(): JsonResponse
    {
        $categories = Category::whereNull('deleted_at')->orderByDesc('created_at')->get(['id', 'category', 'created_at']);

        return response()->json(['result' => $categories], 200);
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $category = new Category;
        $category->category = $request->name;
        $category->save();
        
        return response()->json(['result' => 'ok'], 200);
    }

    public function deleteCategories(Request $request): JsonResponse
    {
        Category::whereIn('id', $request->data)->delete();

        return response()->json(['result' => 'ok'], 200);
    }
}
