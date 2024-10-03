<?php

namespace App\Http\Controllers\Clinic;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Ecommerce\Product;
use App\Http\Controllers\Controller;

class EcommerceController extends Controller
{
    public function index()
    {
    $products = Product::all();
    return Inertia::render('Ecommerce/Product/List', [
        'products' => $products,
    ]);
    }

}
