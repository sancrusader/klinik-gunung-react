<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
public function handle($request, Closure $next, $role)
{
    // Jika tidak terautentikasi, atau role tidak sesuai, maka redirect
    if (!Auth::check() || Auth::user()->role !== $role) {
        // Mapping role ke route
        $roleRedirects = [
            'admin' => 'admin.dashboard',
            'doctor' => 'doctor.dashboard',
            'cashier' => 'cashier.dashboard',
            'cordi' => 'cordi.dashboard',
            'manager' => 'manager.dashboard',
            'paramedis' => 'paramedis.dashboard',
            'patients' => 'dashboard',
        ];

        // Ambil route sesuai role, jika tidak ada redirect ke login
        $route = $roleRedirects[Auth::user()->role] ?? 'login';
        return redirect()->route($route);
    }

    return $next($request);
}

}
