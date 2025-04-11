<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'is_done' => ['required', 'boolean'],  // is_done tetap wajib
        ];

        // Cek apakah ini adalah update atau create
        if ($this->isMethod('post')) {
            // Jika ini adalah create (POST), title wajib
            $rules['title'] = ['required', 'string'];
        } else {
            // Jika ini adalah update (PUT), title tidak wajib
            $rules['title'] = ['nullable', 'string'];  // title boleh kosong saat update
        }

        return $rules;
    }
}
