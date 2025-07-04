import { Dispatch, SetStateAction } from "react";
import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open= {open} onOpenChange={setOpen}>
            <CommandInput
            placeholder="Find a meeting"
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
                <CommandItem>
                    Test2
                </CommandItem>
                <CommandItem>
                    Test3
                </CommandItem>
                <CommandItem>
                    Test4
                </CommandItem>
                <CommandItem>
                    Test5
                </CommandItem>

            </CommandList>
        </CommandResponsiveDialog>
    )
}