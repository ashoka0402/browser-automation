import { OrganizationList } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function ChooseOrganizationPage() {
  await auth.protect({ unauthenticatedUrl: "/sign-in" })

  return <OrganizationList />
}
