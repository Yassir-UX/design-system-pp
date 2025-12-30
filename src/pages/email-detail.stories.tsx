import type { Meta, StoryObj } from "@storybook/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import EmailDetailPage from "./email-detail"

const meta: Meta<typeof EmailDetailPage> = {
  title: "Pages/Email Detail",
  component: EmailDetailPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/inbox/1"]}>
        <Routes>
          <Route path="/inbox/:emailId" element={
            <div className="h-screen w-screen bg-gray-cool-50 p-xl">
              <div className="h-full flex gap-sm">
                {/* Simulated email list */}
                <div className="w-[250px] h-full bg-white rounded-2xl border border-gray-cool-100 shrink-0" />
                {/* Email detail page */}
                <div className="flex-1 h-full bg-white rounded-l-2xl border border-gray-cool-100 border-r-0 overflow-hidden">
                  <Story />
                </div>
              </div>
            </div>
          } />
        </Routes>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EmailDetailPage>

export const Default: Story = {}
