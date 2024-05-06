import { PiSquaresFourLight } from "react-icons/pi"
import { FaRegStickyNote } from "react-icons/fa";
import { CiCalendar, CiStickyNote } from "react-icons/ci";
import { TfiHeadphoneAlt } from "react-icons/tfi";

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
    name: "Task",
    icon: CiCalendar,
    url: "/task",
    size: 30,
  },
  {
    name: "Support",
    icon: TfiHeadphoneAlt,
    url: "/support",
    size: 24,
  },
]