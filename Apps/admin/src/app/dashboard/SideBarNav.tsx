import {
  Typography, 
  Box,
  Drawer,
  Stack,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText
} from'@mui/material'
export default function SideBarNav() {
  const drawerWidth = 300;
  // based on MUI example https://github.com/mui/material-ui/blob/v7.1.0/docs/data/material/getting-started/templates/dashboard/components/SideMenu.tsx
  return (
    <Drawer variant="permanent" sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}>
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <List>
          <ListItem>
            <ListItemText>
              Drivers
            </ListItemText>
          </ListItem>
        </List>
      </Box>

      <Divider />
       <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Anna Admin"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Anna Admin
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            anna@books.com
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  )
}