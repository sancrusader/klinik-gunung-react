<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PatientScreeningUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public $patient
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('screening-user'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'screening-process';
    }

    public function broadcastWith(): array
    {
        // Asumsikan $this->patient adalah instance model atau array yang berisi `full_name` dan `age`
        return [
            'data' => [
                'id' => $this->patient->id,
                'full_name' => $this->patient->full_name,
                'age' => $this->patient->age,
                'contact_number' => $this->patient->contact_number,
                'planned_hiking_date' => $this->patient->planned_hiking_date,
                'previous_hikes_count' => $this->patient->previous_hikes_count,
                'gender' => $this->patient->gender,
            ],
        ];
    }
}
