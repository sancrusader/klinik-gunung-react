<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Ecommerce\Product;
use Inertia\Inertia;

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
