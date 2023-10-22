<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Sales;
use App\Models\Country;
use App\Models\Sector;
use App\Models\InvestmentType;

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

    public function showAssets(): JsonResponse
    {
        $assets = Asset::with('category', 'sales', 'country', 'sector', 'investment_type')->whereNull('deleted_at')->orderByDesc('created_at')->get();

        for ($i = 0; $i < count($assets); $i++) {
            $assets[$i]->category_name = $assets[$i]->category()->get('category')[0]->category;
            $assets[$i]->sales_name = $assets[$i]->sales()->get('name')[0]->name;
            $assets[$i]->country_name = $assets[$i]->country()->get('country')[0]->country;
            $assets[$i]->sector_name = $assets[$i]->sector()->get('sector')[0]->sector;
            $assets[$i]->investment_type_name = $assets[$i]->investment_type()->get('type')[0]->type;
        }

        return response()->json(['result' => $assets], 200);
    }

    public function showCategories(): JsonResponse
    {
        $categories = Category::whereNull('deleted_at')->orderByDesc('created_at')->get(['id', 'category', 'created_at']);

        return response()->json(['result' => $categories], 200);
    }

    public function showSales(): JsonResponse
    {
        $sales = Sales::whereNull('deleted_at')->orderByDesc('created_at')->get(['id', 'name', 'created_at']);

        return response()->json(['result' => $sales], 200);
    }

    public function showCountries(): JsonResponse
    {
        $countries = Country::whereNull('deleted_at')->orderByDesc('created_at')->get(['id', 'country', 'created_at']);

        return response()->json(['result' => $countries], 200);
    }

    public function showSectors(): JsonResponse
    {
        $countries = Sector::whereNull('deleted_at')->orderByDesc('created_at')->get(['id', 'sector', 'created_at']);

        return response()->json(['result' => $countries], 200);
    }

    public function showInvestmentTypes(): JsonResponse
    {
        $investment_types = InvestmentType::whereNull('deleted_at')->orderByDesc('created_at')->get(['id', 'type', 'created_at']);

        return response()->json(['result' => $investment_types], 200);
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $category = new Category;
        $category->category = $request->name;
        $category->save();
        
        return response()->json(['result' => 'ok'], 200);
    }

    public function storeSales(Request $request): JsonResponse
    {
        $sales = new Sales;
        $sales->name = $request->name;
        $sales->save();
        
        return response()->json(['result' => 'ok'], 200);
    }

    public function storeCountry(Request $request): JsonResponse
    {
        $country = new Country;
        $country->country = $request->country;
        $country->save();
        
        return response()->json(['result' => 'ok'], 200);
    }

    public function storeSector(Request $request): JsonResponse
    {
        $sector = new Sector;
        $sector->sector = $request->sector;
        $sector->save();
        
        return response()->json(['result' => 'ok'], 200);
    }

    public function storeInvestmentType(Request $request): JsonResponse
    {
        $investment_type = new InvestmentType;
        $investment_type->type = $request->type;
        $investment_type->save();
        
        return response()->json(['result' => 'ok'], 200);
    }

    public function deleteCategories(Request $request): JsonResponse
    {
        Category::whereIn('id', $request->data)->delete();

        return response()->json(['result' => 'ok'], 200);
    }

    public function deleteSales(Request $request): JsonResponse
    {
        Sales::whereIn('id', $request->data)->delete();

        return response()->json(['result' => 'ok'], 200);
    }

    public function deleteCountries(Request $request): JsonResponse
    {
        Country::whereIn('id', $request->data)->delete();

        return response()->json(['result' => 'ok'], 200);
    }

    public function deleteSectors(Request $request): JsonResponse
    {
        Sector::whereIn('id', $request->data)->delete();

        return response()->json(['result' => 'ok'], 200);
    }

    public function deleteInvestmentTypes(Request $request): JsonResponse
    {
        InvestmentType::whereIn('id', $request->data)->delete();

        return response()->json(['result' => 'ok'], 200);
    }
}
