<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index($orderId)
    {
        $order = Order::with('items.product')->findOrFail($orderId);
        return view('admin.order-items.index', compact('order'));
    }

    // Menampilkan form untuk menambahkan item baru ke pesanan
    public function create($orderId)
    {
        $order = Order::findOrFail($orderId);
        $products = Product::all(); // Menampilkan semua produk yang bisa ditambahkan
        return view('admin.order-items.create', compact('order', 'products'));
    }

    // Menyimpan item baru ke pesanan
    public function store(Request $request, $orderId)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $order = Order::findOrFail($orderId);
        $product = Product::findOrFail($request->product_id);

        // Menambahkan item ke pesanan
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'price' => $product->price,
        ]);

        return redirect()->route('admin.order-items.index', $orderId)->with('success', 'Item added to order successfully!');
    }

    // Menampilkan form untuk mengedit item dalam pesanan
    public function edit($orderId, $itemId)
    {
        $orderItem = OrderItem::where('order_id', $orderId)->findOrFail($itemId);
        $products = Product::all();
        return view('admin.order-items.edit', compact('orderItem', 'products'));
    }

    // Memperbarui item dalam pesanan
    public function update(Request $request, $orderId, $itemId)
    {
        $orderItem = OrderItem::where('order_id', $orderId)->findOrFail($itemId);

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Memperbarui item dalam pesanan
        $orderItem->update([
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'price' => $product->price,
        ]);

        return redirect()->route('admin.order-items.index', $orderId)->with('success', 'Order item updated successfully!');
    }

    // Menghapus item dari pesanan
    public function destroy($orderId, $itemId)
    {
        $orderItem = OrderItem::where('order_id', $orderId)->findOrFail($itemId);

        $orderItem->delete();

        return redirect()->route('admin.order-items.index', $orderId)->with('success', 'Order item deleted successfully!');
    }
}
