"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface ProgramItem {
  title: string;
  description: string;
  link: string;
}

interface ProgramsSectionProps {
  programs: ProgramItem[];
  setPrograms: (newPrograms: ProgramItem[]) => void;
}

export default function ProgramsSection({ programs, setPrograms }: ProgramsSectionProps) {
  const handleProgramChange = (
    index: number,
    field: "title" | "description" | "link",
    value: string
  ) => {
    const updated = [...programs];
    updated[index] = { ...updated[index], [field]: value };
    setPrograms(updated);
  };

  const addProgram = () => {
    setPrograms([...programs, { title: "", description: "", link: "" }]);
  };

  const removeProgram = (index: number) => {
    setPrograms(programs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Programs</h2>
      {programs.map((program, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md relative">
          <Button
            type="button"
            onClick={() => removeProgram(index)}
            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs"
          >
            Remove
          </Button>

          {/* Program Title */}
          <FormItem>
            <FormLabel>Program Title</FormLabel>
            <FormControl>
              <Input
                value={program.title}
                onChange={(e) => handleProgramChange(index, "title", e.target.value)}
              />
            </FormControl>
          </FormItem>

          {/* Program Description */}
          <FormItem>
            <FormLabel>Program Description</FormLabel>
            <FormControl>
              <Textarea
                value={program.description}
                onChange={(e) => handleProgramChange(index, "description", e.target.value)}
              />
            </FormControl>
          </FormItem>

          {/* Program Link */}
          <FormItem>
            <FormLabel>Program Link</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://example.com"
                value={program.link}
                onChange={(e) => handleProgramChange(index, "link", e.target.value)}
              />
            </FormControl>
          </FormItem>
        </div>
      ))}

      <Button type="button" onClick={addProgram} className="px-4 py-2 flex items-center gap-2">
        + Add More Program
      </Button>
    </div>
  );
}
