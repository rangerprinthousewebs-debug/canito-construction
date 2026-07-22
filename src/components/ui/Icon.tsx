import React from "react";
import {
  Menu,
  X,
  Globe,
  ArrowUpRight,
  Home,
  Briefcase,
  Layers,
  Shield,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Clock,
  Award,
  Users,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  LucideProps,
} from "lucide-react";

export type IconType =
  | "menu"
  | "close"
  | "globe"
  | "arrowRight"
  | "home"
  | "briefcase"
  | "layers"
  | "shield"
  | "chevronLeft"
  | "chevronRight"
  | "pen"
  | "clock"
  | "award"
  | "users"
  | "mail"
  | "phone"
  | "mapPin"
  | "send"
  | "spinner";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconType;
}

const iconRegistry: Record<IconType, React.ComponentType<LucideProps>> = {
  menu: Menu,
  close: X,
  globe: Globe,
  arrowRight: ArrowUpRight,
  home: Home,
  briefcase: Briefcase,
  layers: Layers,
  shield: Shield,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  pen: PenTool,
  clock: Clock,
  award: Award,
  users: Users,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  send: Send,
  spinner: Loader2,
};

export default function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = iconRegistry[name];
  if (!IconComponent) return null;

  return <IconComponent className={className} {...props} />;
}
