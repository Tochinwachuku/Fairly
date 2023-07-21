import {
  Calendar,
  Settings,
  Heart,
  List,
  Sliders,
  Users,
  BookOpen,
  Book,
  User,
  File,
  Navigation,
  Lock,
  Briefcase,
  Triangle,
  Globe,
  Package,
  Clipboard,
} from "react-feather";

const pagesSection = [
  {
    href: "/dashboard",
    icon: Sliders,
    title: "Dashboards",
    children: [
      {
        href: "/dashboard/analytics",
        title: "Analytics",
        roles: ["SysAdmin"],
      },
      {
        href: "/references/chart",
        title: "Reference Analytics",
        roles: ["SysAdmin"],
      },
      {
        href: "/dashboard/newsletter/subscriptions",
        title: "Newsletter",
        roles: ["SysAdmin"],
      },
      {
        href: "",
        title: "Organizations",
        roles: ["SysAdmin"],
        children: [
          {
            href: "/dashboard/admin/organizations/add",
            title: "Add New Organizations",
          },
          {
            href: "/organizations/formtool",
            title: "Organization Form Tool",
          },
          {
            href: "/dashboard/admin/organizations",
            title: "Organizations List",
          },
        ],
      },
      {
        href: "/dashboard/admin/users",
        title: "Users",
        roles: ["SysAdmin"],
      },
      {
        href: "/dashboards/candidate",
        title: "Candidate",
        roles: ["Candidate"],
      },
    ],
  },
  {
    href: "/survey",
    icon: File,
    title: "Surveys",
    children: [
      {
        href: "/surveys/",
        title: "Avaliable Surveys",
        roles: ["SysAdmin"],
      },
      {
        href: "/surveys/builder",
        title: "Survey Builder",
        roles: ["SysAdmin"],
      },
      {
        href: "/take/5/survey",
        title: "Take Survey",
        roles: [],
      },
    ],
  },
  {
    href: "/organizations",
    title: "Organizations",
    icon: Globe,
    children: [
      {
        href: "/admin/organizations/add",
        title: "Add New Organizations",
      },
      {
        href: "/dashboard/admin/organizations/AddLocationsForm",
        title: "Add New Locations",
        roles: ["OrgAdmin"],
      },
      {
        href: "/dashboard/admin/organizations",
        title: "Dash Organizations List",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        href: "/admin/organization/members/list",
        title: "Organizations Members",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        href: "/teams/add",
        title: "Add Team",
        roles: ["OrgAdmin", "SysAdmin"],
      },
      {
        href: "/teams/",
        title: "Teams List",
        roles: ["OrgAdmin", "SysAdmin", "HiringAdmin", "Employee"],
      },
    ],
  },

  {
    href: "/social",
    icon: Users,
    title: "Social",
    children: [
      {
        href: "/dashboard/chat",
        title: "Chat",
        badge: "New",
        roles: [],
      },
      {
        href: "/dashboard/videochat",
        title: "Videochat",
        roles: ["Candidate", "HiringAdmin", "SysAdmin"],
      },
      {
        href: "/externallinks",
        title: "Social Media",
        roles: ["Candidate", "HiringAdmin", "OrgAdmin"],
      },
      {
        href: "/externallinks/add",
        title: "New Social Media Link",
        roles: ["Candidate", "HiringAdmin", "OrgAdmin"],
      },
      {
        href: "/sharestories",
        title: "Success Stories",
        roles: ["Candidate", "HiringAdmin", "SysAdmin", "Employee", "OrgAdmin"],
      },
    ],
  },
  {
    href: "/jobs",
    icon: Briefcase,
    title: "Jobs",
    children: [
      {
        href: "/dashboard/jobs/wizard",
        title: "New Job Posting",
        children: [
          {
            href: "/skills/add",
            title: "Add New Skill",
            roles: ["Employee", "Candidate"],
          },
          {
            href: "jobs/skills",
            title: "Required Job Skills",
            roles: ["HiringAdmin"],
          },
          {
            href: "/skills/list",
            title: "Skill List",
            roles: ["Employee", "Candidate", "SysAdmin"],
          },
        ],
      },
      {
        href: "/jobs/compensations",
        title: "Compensation",
        icon: Package,
        roles: ["SysAdmin", "HiringAdmin", "OrgAdmin"],
        children: [
          {
            href: "/jobs/compensations/packages",
            title: "Compensations Dashboard",
            roles: ["HiringAdmin", "OrgAdmin"],
          },
          {
            href: "/jobs/compensations/configuration",
            title: "Compensation Configuration",
            roles: ["SysAdmin"],
          },
        ],
      },
    ],
  },

  {
    href: "/dashboard",
    title: "Preferences",
    roles: ["Employee", "Candidate"],
    children: [
      {
        href: "/dashboard/personalvalue/ranking",
        title: "Rank your preferences",
        roles: ["Employee", "Candidate"],
      },
      {
        href: "/dashboard/jobs/wizard",
        title: "New Job Posting",
        roles: ["SysAdmin", "HiringAdmin"],
      },
      {
        href: "/dashboard/resume",
        title: "Resume",
        roles: ["Employee", "SysAdmin", "OrgAdmin", "HiringAdmin", "Candidate"],
      },
      {
        href: "/skills",
        title: "Skills",
        children: [
          {
            href: "/skills/add",
            title: "Add New Skill",
            roles: ["Employee", "Candidate", "SysAdmin"],
          },
          {
            href: "/jobs/skills",
            title: "Required Job Skills",
            roles: ["HiringAdmin"],
          },
          {
            href: "/dashboard/skills/list",
            title: "Skill List",
            roles: ["Employee", "Candidate", "SysAdmin"],
          },
        ],
      },
    ],
    href: "/dashboard/files",
    title: "Files",
    icon: File,
    roles: ["Employee", "Candidate", "SysAdmin"],
  },
  {
    href: "/licenses",
    title: "Licenses",
    icon: Clipboard,
    children: [
      {
        href: "/licenses",
        title: "Licenses List",
        roles: ["Candidate", "SysAdmin"],
      },
      {
        href: "/licenses/add",
        title: "Add New License",
        roles: ["Candidate", "SysAdmin"],
      },
    ],
  },
  {
    href: "",
    title: "Preferences",
    icon: Sliders,
    roles: ["Employee", "Candidate"],
    children: [
      {
        href: "/dashboard/personalvalue/ranking",
        title: "Rank your preferences",
        roles: ["Employee", "Candidate"],
      },
      {
        href: "/goals",
        title: "Candidate Goals",
        roles: ["Candidate", "SysAdmin", "OrgAdmin", "HiringAdmin"],
      },
    ],
  },
  {
    href: "/donation",
    icon: Heart,
    title: "Donations",
    children: [
      {
        href: "/donation/charitablefund/form",
        title: "Charitable Fund Form",
        roles: ["SysAdmin", "OrgAdmin"],
        href: "/preference",
        title: "Preferences",
        roles: ["Employee", "Candidate"],
        children: [
          {
            href: "/dashboard/personalvalue/ranking",
            title: "Rank your preferences",
            roles: ["Employee", "Candidate"],
          },
        ],
      },
      {
        href: "/dashboard/locations/add",
        title: "Add New Location",
        roles: ["Employee", "Candidate", "SysAdmin"],
      },
    ],

    href: "/dashboard/locations",
    icon: Navigation,
    title: "Locations",
    children: [
      {
        href: "/appointments/new",
        title: "Appointment Form",
        roles: ["SysAdmin", "HiringAdmin"],
      },
    ],
  },

  {
    href: "/settings",
    icon: Settings,
    title: "Configuration",
    children: [
      {
        href: "/pricing",
        title: "Pricing",
        roles: [],
      },
      {
        href: "/dashboard/settings",
        title: "Settings",
        roles: [],
      },
    ],
  },
  {
    href: "/auth",
    icon: Lock,
    title: "Auth",
    children: [
      {
        href: "/auth/signin",
        title: "Sign In",
        roles: ["Candidate", "HiringAdmin", "SysAdmin", "Employee", "OrgAdmin"],
      },
      {
        href: "/auth/signup",
        title: "Sign Up",
        roles: ["Candidate", "HiringAdmin", "SysAdmin", "Employee", "OrgAdmin"],
      },
    ],
  },
  {
    href: "/education",
    icon: BookOpen,
    title: "Education",
    children: [
      {
        href: "/dashboard/user/education/create",
        title: "Add New Record",
        roles: ["Candidate", "SysAdmin"],
      },
      {
        href: "/dashboard/user/education/showlist",
        title: "My Education",
        roles: ["Candidate", "HiringAdmin", "SysAdmin"],
      },
      {
        href: "/schools/new",
        title: "Add School",
        roles: ["Employee", "Candidate", "SysAdmin"],
      },
      {
        href: "/schools/paged",
        title: "School List",
        roles: ["Candidate", "HiringAdmin", "SysAdmin"],
      },
    ],
  },
  {
    href: "/user/skills",
    icon: User,
    title: "My Skills",
    children: [
      {
        href: "/user/skills/new",
        title: "Add New Skill",
        roles: ["Candidate", "SysAdmin"],
      },
      {
        href: "/user/skills/list",
        title: "Skills List",
        roles: ["Candidate", "HiringAdmin", "SysAdmin"],
      },
    ],
  },

  {
    href: "/faqs",
    icon: Triangle,
    title: "FAQs",
    children: [
      {
        href: "/faqs/new",
        title: "Add New FAQ",
        roles: ["SysAdmin"],
      },
      {
        href: "/faqs",
        title: "View FAQs",
        roles: [],
      },
    ],
  },
  {
    href: "/appointments",
    icon: Calendar,
    title: "Appointments",
    children: [
      {
        href: "/appointments/new",
        title: "Appointment Form",
        roles: ["HiringAdmin", "SysAdmin"],
      },
      {
        href: "/appointments/list",
        title: "Appointments List",
        roles: ["Candidate", "HiringAdmin", "SysAdmin"],
      },
    ],
  },
  {
    href: "/newsletters",
    icon: Book,
    title: "Newsletters",
    children: [
      {
        href: "/newsletters/",
        title: "Newsletters",
      },
      {
        href: "/newsletters/new",
        title: "Create Newsletter",
        roles: ["SysAdmin"],
      },
      {
        href: "/candidate/resume",
        icon: List,
        title: "Resume Wizard",
        roles: ["Candidate"],
      },
    ],
  },
  {
    href: "/calendar",
    icon: Calendar,
    title: "Calendar",
    roles: [],

    children: [
      {
        href: "/donation/charitablefund/form",
        title: "Charitable Fund Form",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        href: "/donation/charitablefund/list",
        title: "Charitable Fund List",
        roles: ["SysAdmin", "OrgAdmin"],
      },
      {
        href: "/donate",
        title: "Donate",
        roles: [],
      },
    ],
  },
  {
    href: "/blogs",
    icon: BookOpen,
    title: "Blogs",
    children: [
      {
        href: "/blogs/add",
        title: "New Blogs",
        roles: [],
      },
      {
        href: "/blogs",
        title: "View Blogs",
      },
      {
        href: "/comments",
        title: "Comments",
      },
    ],
  },
  {
    href: "/candidate/resume",
    icon: List,
    title: "Resume Wizard",
    roles: ["Candidate"],
  },
];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
