import automationImg from "../assets/industries/industrial_automation.png";
import motorImg from "../assets/industries/manufacturing.png";
import bearingsImg from "../assets/factory_interior.png";
import electricalImg from "../assets/industries/power_electrical.png";
import hydraulicImg from "../assets/industries/mining.png";
import sparePartsImg from "../assets/industries/road_construction.png";
import roadImg from "../assets/industries/road_construction.png";
import manufacturingImg from "../assets/industries/manufacturing.png";
import miningImg from "../assets/industries/mining.png";

export const PRODUCT_FILTER_CATEGORIES = [
  "All",
  "Road Construction Machinery",
  "Electrical & Automation",
  "Spare Parts",
  "Industrial Components",
];

export const PRODUCT_CATEGORIES = [
  {
    title: "Road Construction Machinery",
    filterCategory: "Road Construction Machinery",
    description:
      "Sourcing support for road construction and infrastructure equipment based on project specifications.",
    items: [
      "Asphalt Plants",
      "Concrete Batching Plants",
      "Pavers",
      "Road Rollers",
    ],
  },
  {
    title: "Electrical & Automation",
    filterCategory: "Electrical & Automation",
    description:
      "Industrial control, automation, and electrical products sourced to match technical requirements.",
    items: ["PLC Controllers", "Control Panels", "HMIs", "Sensors"],
  },
  {
    title: "Spare Parts",
    filterCategory: "Spare Parts",
    description:
      "Replacement parts and maintenance components identified and sourced per your equipment needs.",
    items: ["Bearings", "Motors", "Belts", "Hydraulic Components"],
  },
  {
    title: "Industrial Components",
    filterCategory: "Industrial Components",
    description:
      "Mechanical and electrical components for industrial systems, plants, and equipment.",
    items: ["Drives", "Switchgear", "Relays", "Power Supplies"],
  },
];

export const FEATURED_PRODUCTS = [
  {
    title: "PLC Systems",
    category: "Industrial Automation",
    filterCategory: "Electrical & Automation",
    manufacturers: "Siemens, ABB, Omron",
    description:
      "Programmable logic controllers and automation modules for process control applications.",
    image: automationImg,
  },
  {
    title: "Industrial Motors",
    category: "Power Transmission",
    filterCategory: "Spare Parts",
    manufacturers: "Siemens, Nidec, ABB",
    description:
      "Electric motors, AC/DC drives, and variable speed control systems for industrial use.",
    image: motorImg,
  },
  {
    title: "Bearings & Power Transmission",
    category: "Mechanical Spares",
    filterCategory: "Spare Parts",
    manufacturers: "SKF, FAG, NSK",
    description:
      "Industrial bearings, couplings, power transmission belts, and gearbox components.",
    image: bearingsImg,
  },
  {
    title: "Electrical Panels",
    category: "Electrical Systems",
    filterCategory: "Electrical & Automation",
    manufacturers: "Schneider, Siemens",
    description:
      "Electrical control panels, switchgear boards, and circuit protection systems.",
    image: electricalImg,
  },
  {
    title: "Hydraulic Components",
    category: "Fluid Power",
    filterCategory: "Spare Parts",
    manufacturers: "Rexroth, Eaton",
    description:
      "Hydraulic cylinders, pumps, control valves, and fluid power spare components.",
    image: hydraulicImg,
  },
  {
    title: "OEM Spare Parts",
    category: "Machinery Spares",
    filterCategory: "Spare Parts",
    manufacturers: "CAT, Volvo, Komatsu",
    description:
      "Replacement parts, filters, engine components, and wear parts for heavy machinery.",
    image: sparePartsImg,
  },
  {
    title: "Asphalt Plants",
    category: "Road Construction Machinery",
    filterCategory: "Road Construction Machinery",
    manufacturers: "Various OEM manufacturers",
    description:
      "Asphalt batching and mixing plant equipment sourced based on capacity and project requirements.",
    image: roadImg,
  },
  {
    title: "Control Panels",
    category: "Electrical Systems",
    filterCategory: "Electrical & Automation",
    manufacturers: "Schneider, Siemens, ABB",
    description:
      "Industrial control panels and switchboards configured to application and specification needs.",
    image: electricalImg,
  },
  {
    title: "Drives & Switchgear",
    category: "Industrial Components",
    filterCategory: "Industrial Components",
    manufacturers: "ABB, Siemens, Schneider",
    description:
      "Variable frequency drives, switchgear, relays, and power supply components for industrial systems.",
    image: manufacturingImg,
  },
];

export const APPLICATION_AREAS = [
  {
    title: "Road & Infrastructure",
    category: "Infrastructure Sourcing",
    description:
      "Sourcing support for road construction equipment, asphalt plants, pavers, and infrastructure-related machinery requirements.",
    image: roadImg,
  },
  {
    title: "Manufacturing",
    category: "Plant & Production",
    description:
      "Components, equipment, and spare parts for manufacturing facilities, assembly lines, and production operations.",
    image: manufacturingImg,
  },
  {
    title: "Industrial Automation",
    category: "Process Control",
    description:
      "PLC systems, sensors, drives, and automation hardware for process control and manufacturing modernization.",
    image: automationImg,
  },
  {
    title: "Mining",
    category: "Heavy Equipment",
    description:
      "Excavation equipment spares, hydraulic components, and heavy machinery parts for mining operations.",
    image: miningImg,
  },
  {
    title: "Power & Electrical",
    category: "Electrical Systems",
    description:
      "Electrical panels, switchgear, power distribution, and control systems for industrial applications.",
    image: electricalImg,
  },
  {
    title: "Machinery & Spare Parts",
    category: "OEM Components",
    description:
      "Genuine replacement parts, maintenance components, and mechanical spares for industrial and road machinery.",
    image: bearingsImg,
  },
];

export const HOMEPAGE_APPLICATION_AREAS = APPLICATION_AREAS.slice(0, 3);

export const REQUIREMENT_SUPPORT_AREAS = [
  {
    title: "Machinery Sourcing",
    description:
      "Identifying and coordinating road construction, mining, and industrial machinery based on your specifications.",
  },
  {
    title: "Component Procurement",
    description:
      "Sourcing mechanical and electrical components aligned with application requirements and technical parameters.",
  },
  {
    title: "Automation & Electrical Sourcing",
    description:
      "Procurement support for PLCs, control panels, sensors, and electrical systems used in industrial operations.",
  },
  {
    title: "Spare Parts Identification",
    description:
      "Helping locate OEM and compatible spare parts using part numbers, equipment details, and application context.",
  },
  {
    title: "Technical Requirement Coordination",
    description:
      "Reviewing specifications and documentation to align product options with your engineering requirements.",
  },
  {
    title: "Delivery Coordination",
    description:
      "Coordinating dispatch and logistics to your designated delivery location once procurement is approved.",
  },
];
