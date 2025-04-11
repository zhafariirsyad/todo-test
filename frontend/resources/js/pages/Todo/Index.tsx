import { Head, router, useForm } from "@inertiajs/react";
import { CircleCheck, CircleX, Pencil } from "lucide-react";
import { Todo } from "@/types/todo";
import { useState } from "react";

export default function Index({ todos }: { todos: Todo[] }){

    const {data, setData, post, put, delete: destroy, reset, errors} = useForm({
        title: "",
        is_done: 0
    });

    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [alert, setAlert] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!data.title.trim()){
            setAlert("Title cannot be empty!");
            setTimeout(() => setAlert(null), 2000);
            return;
        }

        if(editingTodo){
            put(route("todos.update", editingTodo.id),{
                onSuccess: () => {
                    setAlert("Todo Updated Successfully!");
                    setTimeout(() => setAlert(null), 2000);
                    reset();
                    setEditingTodo(null)
                }
            });
        }else{
            post(route("todos.store"),{
                onSuccess: () => {
                    setAlert("Todos Created Successfully");
                    setTimeout(() => setAlert(null), 2000);
                    reset();
                }
            })
        }
    }

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setData({
            title: todo.title,
            is_done: todo.is_done,
        });
    }

    const handleUpdateStatus = (todo: Todo) => {
        router.put(route("todos.update", todo.id), {
            is_done: todo.is_done === true ? 0 : 1,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setAlert("Todo status updated");
                setTimeout(() => setAlert(null), 2000);
            },
        });
    };

    const handleDelete = (id: number) => {
        destroy(route("todos.destroy", id), {
            preserveScroll: true,
            onSuccess: () => {
                setAlert("Todo deleted");
                setTimeout(() => setAlert(null), 2000);
            },
        });
    };

    const handleCancel = () => {
        setEditingTodo(null)
        reset()
    }

    return (
        <>
            <Head title="Todo List"></Head>
            <div className="dark:text-white light:text-black">
                <div className="min-h-screen flex justify-center">
                    <div className="w-full max-w-xl p-4">
                        <h1 className="text-4xl font-bold text-center mb-6">Task Management</h1>

                        {alert && (
                            <div className="alert alert-success bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
                                {alert}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Form */}
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="title" className="font-medium items-start justify-start">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    name="title"
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Enter task..."
                                />
                                {editingTodo ? (
                                    <div className="flex flex-row gap-4 items-center justify-center">
                                        <button type="submit" className="bg-[#FFB46F] px-4 py-2 rounded self-center justify-center text-black">
                                            Update Task
                                        </button>
                                        <button type="button" onClick={handleCancel} className="bg-[#FF6F6F] px-4 py-2 rounded self-center justify-center text-black">
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button type="submit" className="bg-[#6FCBFF] px-4 py-2 rounded self-center justify-center text-black">
                                        Add Task
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Tasks Section */}
                        <div className="mt-8 space-y-6">
                            <div className="flex flex-col gap-4">
                                <h2 className="font-bold">Ongoing Task</h2>
                                {/* Item Task Ongoing */}
                                {todos.filter((t) => !t.is_done).map((todo) => (
                                    <div key={todo.id} className="w-full max-w-xl p-5 bg-[#D0D0D0] rounded-[10px]">
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-row gap-2">
                                                    <p className="text-black">{todo.title}</p>
                                                    <button onClick={() => handleEdit(todo)}>
                                                        <Pencil size={15} className="text-black"/>
                                                    </button>
                                                </div>
                                                <p className="text-xs text-black">
                                                    {new Date(todo.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <CircleX onClick={() => handleDelete(todo.id)} size={24} className="text-black"/>
                                                <input
                                                    type="radio"
                                                    name={`is_done-${todo.id}`}
                                                    id={`done-todo-${todo.id}`}
                                                    className="size-[24px] border-4 border-black"
                                                    checked={todo.is_done === 1} // menandakan status is_done
                                                    onChange={() => handleUpdateStatus(todo)} // Memanggil fungsi saat status diubah
                                                />

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                <h2 className="font-bold">Completed Task</h2>
                                <div className="space-y-2">
                                    {/* Item Task Completed */}
                                    {todos.filter((t) => t.is_done).map((todo) => (
                                        <div key={todo.id} className="w-full max-w-xl p-5 bg-[#D0D0D0] rounded-[10px]">
                                            <div className="flex flex-row items-center justify-between">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-row gap-2">
                                                        <p className="line-through text-black">{todo.title}</p>
                                                        <button onClick={() => handleEdit(todo)}>
                                                            <Pencil size={15} className="text-black"/>
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-black">
                                                        {new Date(todo.updated_at).toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <CircleX onClick={() => handleDelete(todo.id)} size={24} className="text-black"/>
                                                    <CircleCheck onClick={() => handleUpdateStatus(todo)} size={24} className="text-black"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}