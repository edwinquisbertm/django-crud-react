import { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import {useNavigate, useParams} from 'react-router-dom';

export function TaskFormPage() {

  const {register, handleSubmit, formState: {errors}, setValue } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit( async data => {
    if(params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }

    navigate('/tasks');    
  });

  useEffect(() => {
    async function loadTask() {
      if(params.id) {
        const rest = await getTask(params.id);
        setValue('title', rest.data.title);
        setValue('description', rest.data.description);
      }
    }
    loadTask();
  } , [params.id]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="title" {...register("title", { required: true})}/>
        {errors.title && <span>This field is required</span>}
        <textarea rows="3" placeholder="description" {...register("description", {required:true})}></textarea>
        {errors.description && <span>This field is required</span>}

        <button type="submit">Save</button>
      </form>

        {params.id && (
          <button
              onClick={async () => {
                const accepted = window.confirm('Are you sure?');
                if(accepted) {
                  await deleteTask(params.id);
                  navigate('/tasks');
                }
              }}
            >
              Delete
              </button>
            )}
    </div>
  );
}
