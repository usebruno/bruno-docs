import {Logo} from "./src/components/logo";
import {ModeToggle} from "./src/components/theme-switch";


export default {
  logo: <Logo />,
  project: {
    link: 'https://github.com/usebruno/bruno'
  },
  chat: {
    link: 'https://discord.com/invite/KgcZUncpjq'
  },
  navbar: {
    extraContent: <ModeToggle className="ml-1"/>
  }
}