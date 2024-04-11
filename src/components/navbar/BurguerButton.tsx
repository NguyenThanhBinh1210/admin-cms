/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useSidebarContext } from "~/components/layout/layout-context";
import { StyledBurgerButton } from './navbar.styles'

export const BurguerButton = ({ onShow }: any) => {
  // const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      onClick={onShow}
      className={StyledBurgerButton()}
      // open={collapsed}
      // onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  )
}
