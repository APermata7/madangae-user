<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;



class Kernel extends HttpKernel
{
    protected $middleware = [
    \Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance::class,
    \App\Http\Middleware\TrimStrings::class,
    \App\Http\Middleware\ValidatePostSize::class,
        // Middleware global
    ];

    protected $middlewareGroups = [
        'web' => [
            // Middleware web
        ],
        'api' => [
            // Middleware api
        ],
    ];
}
