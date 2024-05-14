import { PiSquaresFourLight } from "react-icons/pi"
import { CiCalendar, CiStickyNote } from "react-icons/ci";
import { RiProgress4Fill, RiProgress8Fill } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";

export const nav_item = [
  {
    name: "Overview",
    icon: PiSquaresFourLight,
    url: "/",
    size: 32,
  },
  {
    name: "Notes",
    icon: CiStickyNote,
    url: "/notes",
    size: 30,
  },
  {
    name: "Project",
    icon: CiCalendar,
    url: "/project",
    size: 30,
  },
]

export const project_columns = [
  { id: "1", title: 'Todo', progress: 1, icon: <RiProgress8Fill className='text-2xl' /> },
  { id: "2", title: 'In Progress', progress: 2, icon: <RiProgress4Fill className='text-2xl text-yellow-400' /> },
  { id: "3", title: 'Done', progress: 3, icon: <FaCircleCheck className='text-xl text-green-400' /> }
];