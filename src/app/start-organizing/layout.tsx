import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Organizing - YourCommunity.Space',
  description: 'Start organizing events in your community',
}

export default function StartOrganizingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}