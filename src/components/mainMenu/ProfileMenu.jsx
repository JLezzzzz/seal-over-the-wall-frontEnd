import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {BiUser } from "react-icons/bi";

const ProfileMenu = () => {
  return (
    <div>
      <Menubar >
      <MenubarMenu className="" >
        <MenubarTrigger className="border-none"><BiUser className="w-6 h-6" /></MenubarTrigger>
        <MenubarContent className="border-1 border-gray-200 bg-white">
        <MenubarItem inset className="text-lg ">Somchai Kitkardee</MenubarItem>
        <MenubarItem inset >Somchai.K@gmail.com</MenubarItem>
        <MenubarSeparator className="border-1 border-gray-200" />
        <MenubarItem inset className="text-lg cursor-pointer ">Dashboard</MenubarItem>
        <MenubarItem inset className="text-lg cursor-pointer ">Order</MenubarItem>
        <MenubarItem inset className="text-lg cursor-pointer ">Create Hub</MenubarItem>
          <MenubarSeparator className="border-1 border-gray-200" />
          <MenubarItem inset className="text-lg cursor-pointer ">Following</MenubarItem>
          <MenubarItem inset className="text-lg cursor-pointer ">Account Setting</MenubarItem>
          <MenubarSeparator className="border-1 border-gray-200" />
          <MenubarItem inset className="text-lg cursor-pointer ">Sign out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      </Menubar>
    </div>
  )
}
export default ProfileMenu