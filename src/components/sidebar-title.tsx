import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export const SidebarTitle = ({
  type,
  title,
  route,
}: {
  type?: string;
  title?: string;
  route?: string;
}) => {
  if (type === 'separator') {
    return (
      <div
        style={{
          background: 'cyan',
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    );
  }
  return <Typography variant="small">{title}</Typography>;
};
