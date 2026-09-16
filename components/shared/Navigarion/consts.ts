import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export const NAVIGATION_LINKS = [
  {
    id: 1,
    label: "Analytics",
    path: "/app/analytics",
    icon: AssessmentOutlinedIcon,
  },
  {
    id: 2,
    label: "Connected Accounts",
    path: "/app/connected_accounts",
    icon: LinkOutlinedIcon,
  },
  {
    id: 3,
    label: "Messages",
    path: "/app/messages",
    icon: SendOutlinedIcon,
  },
  {
    id: 4,
    label: "Content Scheduler",
    path: "/app/scheduler",
    icon: CalendarMonthOutlinedIcon,
  },
  {
    id: 5,
    label: "Posts",
    path: "/app/posts",
    icon: DynamicFeedIcon,
  },
  {
    id: 6,
    label: "Create a Post",
    path: "/app/posts/create",
    icon: AddBoxOutlinedIcon,
  },
];
