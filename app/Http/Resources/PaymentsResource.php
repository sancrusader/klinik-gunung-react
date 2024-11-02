<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        {
            return [
                'id' => $this->id,
                'cashier_id' => $this->cashier_id,
                'payment_method' => $this->payment_method,
                'payment_status' => $this->payment_status,
                'amount_paid' => $this->amount_paid,
                'quantity_product' => $this->quantity_product,
                'price_product'=> $this->price_product,
                'payment_proof' => $this->payment_proof,

            ];
        }
    }
}
