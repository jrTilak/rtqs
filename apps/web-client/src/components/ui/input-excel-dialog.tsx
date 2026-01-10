import * as React from "react";
import * as XLSX from "xlsx";
import { IconFileSpreadsheet } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { ZodError, type ZodSchema } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { alert } from "./alert-dialog/utils";

interface InputExcelDialogProps<T extends Array<Record<any, unknown>>> {
  children?: React.ReactNode;
  onImport: (data: T) => void;
  title?: string;
  description?: string;
  className?: string;
  schema?: ZodSchema<T>;
}

export function InputExcelDialog<T extends Array<Record<any, unknown>>>({
  children,
  onImport,
  title = "Import Excel",
  description = "Select an Excel file to import.",
  className,
  schema,
}: InputExcelDialogProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    processFile(file);
  };

  const processFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet) as T;

        if (schema) {
          jsonData = schema.parse(jsonData);
        }

        onImport(jsonData);
        setIsOpen(false);
      } catch (error) {
        console.error("Excel import error:", error);
        if (error instanceof ZodError) {
          alert({
            title: "Validation Error",
            description: "Please add the excel file with given columns",
            variant: "destructive",
          });
        } else {
          alert({
            title: "Validation Error",
            description: "Failed to parse Excel file",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
        // Reset input value so the same file can be selected again if needed
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    };

    reader.onerror = () => {
      alert({
        title: "Error",
        description: "Failed to read file",
        variant: "destructive",
      });
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors flex flex-col items-center justify-center gap-4 bg-muted/20 hover:bg-muted/40 cursor-pointer",
              isLoading && "opacity-50 pointer-events-none"
            )}
            onClick={() => inputRef.current?.click()}
          >
            <div className="p-4 rounded-full bg-background border shadow-sm">
              <IconFileSpreadsheet className="size-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Click to upload</p>
              <p className="text-xs text-muted-foreground">
                Supports .xlsx, .xls
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
