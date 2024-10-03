<?php

namespace App\Http\Controllers\Ecommerce;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Ecommerce\Product;
use App\Models\Ecommerce\Category;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index(Request $request)
        {
            $products = Product::all();
            return Inertia::render('Ecommerce/Index', [
                'products' => $products,
            ]);
        }

        public function create(){
            return Inertia::render('Ecommerce/Product/Create',[
                'categories'=>$categories = Category::all(),
            ]);
        }

        // Membuat Product Baru
        public function store(Request $request)
        {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan gambar jika ada
        $imagePath = $request->file('image') ? $request->file('image')->store('products', 'public') : null;

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('product')->with('success', 'Product created successfully!');
    }

        // Menampilkan form untuk mengedit produk
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('admin.products.edit', compact('product'));
    }

    // Memperbarui produk
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Simpan gambar baru jika ada
        $imagePath = $request->file('image') ? $request->file('image')->store('products', 'public') : $product->image_path;

        // Memperbarui produk
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully!');
    }

    // Menghapus produk
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }

    public function addToCart(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $cart = session()->get('cart', []);

        if (isset($cart[$id])) {
            $cart[$id]['quantity']++;
        } else {
            $cart[$id] = [
                "name" => $product->name,
                "quantity" => 1,
                "price" => $product->price,
                "image" => $product->image_path
            ];
        }

        session()->put('cart', $cart);

        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }

    public function checkout(Request $request)
{
    $request->validate([
        'total_amount' => 'required|numeric',
        // Tambahkan validasi lain sesuai kebutuhan
    ]);

    $order = Order::create([
        'user_id' => auth()->id(),
        'total_amount' => $request->total_amount,
        'status' => 'pending',
    ]);

    $cart = session()->get('cart');

    foreach ($cart as $id => $details) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $id,
            'quantity' => $details['quantity'],
            'price' => $details['price'],
        ]);
    }

    session()->forget('cart');

    return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
}


}
