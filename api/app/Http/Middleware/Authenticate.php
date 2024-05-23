<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (!$request->expectsJson()) {
            if ($request->user()) {
                return route('dashboard'); // Redirect authenticated users to the dashboard
            }

            return route('login'); // Redirect unauthenticated users to the login page
        }

        return null;
    }
}
