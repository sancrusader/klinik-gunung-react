<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class QrCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $qrCodeUrl;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $qrCodeUrl)
    {
        $this->user = $user;
        $this->qrCodeUrl = $qrCodeUrl;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.qr_code')
            ->subject('Your QR Code')
            ->with([
                'user' => $this->user,
                'qrCodeUrl' => $this->qrCodeUrl,
            ]);
    }
}
