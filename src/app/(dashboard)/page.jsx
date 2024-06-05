import { getData } from '@/controller/init';
import { project_columns } from '@/utils/constants/data';
import Link from 'next/link';

const Page = async () => {
  const project = await getData("task")
  let todo = project.filter(project => project.progress === 1);
  let inProgress = project.filter(project => project.progress === 2);
  let done = project.filter(project => project.progress === 3);

  return (
    <div className="px-10 py-12 text-white/90">
      <h1 className="text-4xl font-bold">Hello User!</h1>
      <p className="text-white/70">You have <span className="text-red-400">{todo.length + inProgress.length} task</span> that you <span className='text-yellow-400'>haven't finished</span> yet. Let's finish them. <span className="text-green-400">Don't forget!!!</span></p>
      <div className="w-full grid grid-cols-3 gap-4">
        {project_columns.map(column => {
          let progressPercentage;
          let totalTasks = todo.length + inProgress.length + done.length;

          if (column.progress === 1) {
            progressPercentage = (todo.length / totalTasks) * 100;
          } else if (column.progress === 2) {
            progressPercentage = (inProgress.length / totalTasks) * 100;
          } else {
            progressPercentage = (done.length / totalTasks) * 100;
          }

          return (
            <Link href={"/task"} key={column.title} className="bg-primary p-4 w-full border border-white/20 rounded-lg mt-10 flex flex-col gap-3">
              <div className='flex items-center gap-2'>
                {column.icon}
                <h2 className="font-bold text-xl">{column.title}</h2>
              </div>
              {
                column.progress === 1 ? (
                  <p>{todo.length} out of {totalTasks} tasks are still in the to-do list</p>
                ) : column.progress === 2 ? (
                  <p>{inProgress.length} out of {totalTasks} tasks are currently in progress</p>
                ) : (
                  <p>{done.length} out of {totalTasks} tasks have been completed</p>
                )
              }
              <div className="w-full h-3 bg-white/80 rounded-lg">
                <div
                  className={`h-full rounded-lg ${column.progress === 1 ? "bg-red-400" : column.progress === 2 ? "bg-yellow-400" : "bg-green-400"}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span>
                {column.progress === 1 ? "Incomplete Tasks" : column.progress === 2 ? "Tasks in Progress" : "Completed Tasks"}
                : {Math.round(progressPercentage)}% completed
              </span>
            </Link>
          );
        })}
      </div>
    </div>

  )
}

export default Page