<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PatientScreeningUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $patient // This should be a string (e.g., patient's name or ID)
    ) {
    }

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
        return [
            'patient' => $this->patient,
        ];
    }
}
