import { ResponsiveDailog } from "@/components/responsive-dailog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";

export const useConfirm = (
    title: string,
    description: string
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, sePromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            sePromise({ resolve });
        });
    };

    const handelClose = () => {
        sePromise(null)
    };

    const handelConfirm = () => {
        promise?.resolve(true);
        handelClose()
    };

    const handelCancel = () => {
        promise?.resolve(false)
        handelClose();
    }

    const ConfirmationDialog = () => (
        <ResponsiveDailog
            open={promise !== null}
            onOpenChange={handelClose}
            title={title}
            description={description}
        >
            <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                <Button
                    onClick={handelCancel}
                    variant="outline"
                    className="w-full lg:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handelConfirm}
                    className="w-full lg:w-auto"
                >
                    Confirm
                </Button>
            </div>
        </ResponsiveDailog>
    );
    return [ConfirmationDialog, confirm];
};
