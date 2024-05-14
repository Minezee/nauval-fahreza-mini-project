'use client'
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { GoPlus } from "react-icons/go";
import { project_columns } from '@/utils/constants/data';
import ProjectCard from '../Card/ProjectCard';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';
import CreateProject from '../Popups/CreateProject';
import { revalidate } from '@/action/revalidatePath';

const ProjectSection = ({ project }) => {
  const [isOpen, setIsOpen] = useState("");

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = project_columns.find(column => column.id === source.droppableId);
    const destColumn = project_columns.find(column => column.id === destination.droppableId);

    const sourceItems = [...project.filter(item => item.progress === sourceColumn.progress)];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      removed.progress = destColumn.progress;
    }

    const destItems = [...project.filter(item => item.progress === destColumn.progress)];
    destItems.splice(destination.index, 0, removed);

    const projectDoc = doc(db, 'task', removed.id);
    await updateDoc(projectDoc, { progress: destColumn.progress })
    .then(() => {
      revalidate("/")
      revalidate("/project")
    })
  };

  resetServerContext()
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid w-full h-full grid-cols-3 gap-8 px-10 pt-12 font-semibold'>
          {project_columns.map((column) => (
            <section
              className='rounded-lg px-5 py-5 max-h-full overflow-y-auto bg-primary2 min-w-[300px] border border-white/10'
            >
              {isOpen === column.title && <CreateProject setIsOpen={setIsOpen} column={column}/>}
              <div className='flex items-center justify-between'>
                <span className='flex gap-2 text-lg items-center'>
                  {column.icon}
                  {column.title}
                </span>
                <button onClick={() => setIsOpen(column.title)}>
                  <GoPlus className='text-2xl' />
                </button>
              </div>
              <Droppable
                droppableId={String(column.id)}
                key={String(column.id)}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='flex flex-col mt-4'>
                    {project.filter(item => item.progress === column.progress).map((data, index) => (
                      <ProjectCard key={data.id} data={data} index={index} columnIcon={column.icon} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default ProjectSection;
