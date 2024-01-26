"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Group>
        <Select.Label>Suggestions</Select.Label>
        <Select.Item value="1">Seif Soliman</Select.Item>
      </Select.Group>
    </Select.Root>
  );
};

export default AssigneeSelect;
