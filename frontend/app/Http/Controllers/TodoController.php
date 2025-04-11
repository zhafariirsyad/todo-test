<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(){
        $notDone = Todo::where('is_done', 0)->orderBy('created_at','asc')->get();
        $done = Todo::where('is_done', 1)->orderBy('updated_at','desc')->get();

        $todos = $notDone->concat($done);

        return Inertia::render('Todo/Index',[
            'todos' => $todos,
        ]);
    }
    public function store(TodoRequest $request)
    {
        try {
            $todo = Todo::create($request->validated());

            Log::info('✅ Todo created successfully', [
                'id' => $todo->id,
                'title' => $todo->title,
                'is_done' => false
            ]);

            return back()->with('success', 'Todo created');
        } catch (\Exception $e) {
            Log::error('Failed to create Todo', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to create Todo.');
        }
    }

    public function update(TodoRequest $request, Todo $todo)
    {
        try {
            $todo->update($request->validated());

            Log::info('✅ Todo updated successfully', [
                'id' => $todo->id,
                'title' => $todo->title,
                'is_done' => $todo->is_done,
            ]);

            return back()->with('success', 'Todo updated');
        } catch (\Exception $e) {
            Log::error('Failed to update Todo', [
                'id' => $todo->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to update Todo.');
        }
    }

    public function destroy(Todo $todo)
    {
        try {
            $todoTitle = $todo->title;
            $todo->delete();

            Log::info('🗑️ Todo deleted successfully', [
                'id' => $todo->id,
                'title' => $todoTitle,
            ]);

            return back()->with('success', 'Todo deleted');
        } catch (\Exception $e) {
            Log::error('Failed to delete Todo', [
                'id' => $todo->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to delete Todo.');
        }
    }
}
