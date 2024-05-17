import React from 'react';
import { getData } from '@/controller/init';
import ProjectSection from '@/components/ui/ProjectSection';

const Page = async () => {
  const project = await getData("task");
  return (
    <ProjectSection project={project} />
  );
};

export default Page;
