import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"
import { useState } from "react"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in an indeterminate state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// Default unchecked state
export const Default: Story = {
  args: {
    checked: false,
  },
}

// Checked state
export const Checked: Story = {
  args: {
    checked: true,
  },
}

// Indeterminate state
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    checked: "indeterminate",
  },
}

// Disabled unchecked
export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
  },
}

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

// Disabled indeterminate
export const DisabledIndeterminate: Story = {
  args: {
    indeterminate: true,
    checked: "indeterminate",
    disabled: true,
  },
}

// Interactive example with state
function InteractiveCheckbox() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false)

  return (
    <div className="flex items-center gap-md">
      <Checkbox
        id="interactive-checkbox"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label
        htmlFor="interactive-checkbox"
        className="text-sm text-gray-cool-700 cursor-pointer select-none"
      >
        {checked === true
          ? "Checked"
          : checked === "indeterminate"
          ? "Indeterminate"
          : "Unchecked"}
      </label>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveCheckbox />,
}

// With Label
function CheckboxWithLabel() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-md">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium text-gray-cool-900 cursor-pointer select-none"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}

export const WithLabel: Story = {
  render: () => <CheckboxWithLabel />,
}

// Group example
function CheckboxGroup() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const items = [
    { id: "item1", label: "Email notifications" },
    { id: "item2", label: "Push notifications" },
    { id: "item3", label: "SMS notifications" },
  ]

  const handleChange = (itemId: string, checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedItems([...selectedItems, itemId])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    }
  }

  return (
    <div className="flex flex-col gap-lg">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-md">
          <Checkbox
            id={item.id}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={(checked) => handleChange(item.id, checked)}
          />
          <label
            htmlFor={item.id}
            className="text-sm text-gray-cool-700 cursor-pointer select-none"
          >
            {item.label}
          </label>
        </div>
      ))}
      <div className="text-xs text-gray-cool-500 mt-md">
        Selected: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
      </div>
    </div>
  )
}

export const Group: Story = {
  render: () => <CheckboxGroup />,
}

// Select All example with indeterminate state
function SelectAllExample() {
  const [items, setItems] = useState([
    { id: "apple", label: "Apple", checked: false },
    { id: "banana", label: "Banana", checked: false },
    { id: "orange", label: "Orange", checked: false },
  ])

  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked)
  const isIndeterminate = someChecked && !allChecked

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    setItems(items.map((item) => ({ ...item, checked: checked === true })))
  }

  const handleItemChange = (itemId: string, checked: boolean | "indeterminate") => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, checked: checked === true } : item
      )
    )
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md pb-md border-b border-gray-cool-200">
        <Checkbox
          id="select-all"
          checked={allChecked ? true : isIndeterminate ? "indeterminate" : false}
          indeterminate={isIndeterminate}
          onCheckedChange={handleSelectAll}
        />
        <label
          htmlFor="select-all"
          className="text-sm font-medium text-gray-cool-900 cursor-pointer select-none"
        >
          Select all fruits
        </label>
      </div>
      <div className="flex flex-col gap-md pl-3xl">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-md">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={(checked) => handleItemChange(item.id, checked)}
            />
            <label
              htmlFor={item.id}
              className="text-sm text-gray-cool-700 cursor-pointer select-none"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export const SelectAll: Story = {
  render: () => <SelectAllExample />,
}

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3xl">
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-900 mb-lg">
          Default States
        </h3>
        <div className="flex items-center gap-3xl">
          <div className="flex flex-col items-center gap-xs">
            <Checkbox checked={false} />
            <span className="text-xs text-gray-cool-500">Unchecked</span>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <Checkbox checked={true} />
            <span className="text-xs text-gray-cool-500">Checked</span>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <Checkbox checked="indeterminate" indeterminate />
            <span className="text-xs text-gray-cool-500">Indeterminate</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-900 mb-lg">
          Disabled States
        </h3>
        <div className="flex items-center gap-3xl">
          <div className="flex flex-col items-center gap-xs">
            <Checkbox checked={false} disabled />
            <span className="text-xs text-gray-cool-500">Unchecked</span>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <Checkbox checked={true} disabled />
            <span className="text-xs text-gray-cool-500">Checked</span>
          </div>
          <div className="flex flex-col items-center gap-xs">
            <Checkbox checked="indeterminate" indeterminate disabled />
            <span className="text-xs text-gray-cool-500">Indeterminate</span>
          </div>
        </div>
      </div>
    </div>
  ),
}
