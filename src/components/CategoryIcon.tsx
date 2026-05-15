import {
  ComputerDesktopIcon,
  TagIcon,
  CakeIcon,
  HomeIcon,
  SparklesIcon,
  BookOpenIcon,
} from './Icons';

const iconMap: Record<string, (props: { size?: number }) => JSX.Element> = {
  'computer-desktop': ComputerDesktopIcon,
  'tag': TagIcon,
  'cake': CakeIcon,
  'home': HomeIcon,
  'sparkles': SparklesIcon,
  'book-open': BookOpenIcon,
};

interface CategoryIconProps {
  name: string;
  size?: number;
}

export default function CategoryIcon({ name, size = 28 }: CategoryIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}
